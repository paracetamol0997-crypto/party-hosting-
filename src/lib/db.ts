import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import os from 'os';

export interface Registration {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  number_of_people: number;
  message?: string | null;
  status: string;
  registered_at: string;
}

export interface DatabaseStatus {
  mode: 'supabase' | 'local';
  isConfigured: boolean;
  supabaseUrl?: string;
  error?: string | null;
  tableExists: boolean;
  storagePath?: string;
}

// Determine safe storage directory (tmp dir on serverless / Vercel)
function getSafeDataDir(): string {
  if (process.env.VERCEL) {
    const tmp = path.join(os.tmpdir(), 'night_out_data');
    if (!fs.existsSync(tmp)) {
      try {
        fs.mkdirSync(tmp, { recursive: true });
      } catch (e) {
        console.warn('Could not create tmp dir:', e);
      }
    }
    return tmp;
  }

  const local = path.join(process.cwd(), 'data');
  try {
    if (!fs.existsSync(local)) {
      fs.mkdirSync(local, { recursive: true });
    }
    return local;
  } catch {
    const tmp = path.join(os.tmpdir(), 'night_out_data');
    if (!fs.existsSync(tmp)) {
      fs.mkdirSync(tmp, { recursive: true });
    }
    return tmp;
  }
}

function getLocalDbPath(): string {
  return path.join(getSafeDataDir(), 'registrations.json');
}

function ensureLocalDbExists() {
  const filePath = getLocalDbPath();
  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
    } catch (err) {
      console.warn('Could not initialize local db file:', err);
    }
  }
}

function readLocalRegistrations(): Registration[] {
  try {
    ensureLocalDbExists();
    const filePath = getLocalDbPath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(raw) as Registration[];
    }
    return [];
  } catch (err) {
    console.error('Error reading local db:', err);
    return [];
  }
}

function writeLocalRegistrations(data: Registration[]) {
  try {
    ensureLocalDbExists();
    const filePath = getLocalDbPath();
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to local db:', err);
  }
}

// Supabase client instance (if configured)
let supabase: SupabaseClient | null = null;
let lastSupabaseError: string | null = null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false },
    });
  } catch (err: any) {
    console.warn('Could not initialize Supabase client:', err);
    lastSupabaseError = err?.message || 'Initialization failed';
  }
}

export function isUsingSupabase(): boolean {
  return Boolean(supabase);
}

/**
 * Get overall database status for admin inspection
 */
export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  if (!supabase || !supabaseUrl) {
    return {
      mode: 'local',
      isConfigured: false,
      error: process.env.VERCEL
        ? 'No Supabase credentials configured. Running in ephemeral serverless mode (data will reset across function restarts). Please connect Supabase in Vercel.'
        : null,
      tableExists: true,
      storagePath: getLocalDbPath(),
    };
  }

  try {
    // Quick probe to test connection and table existence
    const { error } = await supabase
      .from('registrations')
      .select('id', { head: true, count: 'exact' });

    if (error) {
      lastSupabaseError = error.message;
      return {
        mode: 'supabase',
        isConfigured: true,
        supabaseUrl,
        error: error.message,
        tableExists: !error.message.includes('does not exist') && !error.message.includes('relation'),
      };
    }

    return {
      mode: 'supabase',
      isConfigured: true,
      supabaseUrl,
      error: null,
      tableExists: true,
    };
  } catch (err: any) {
    return {
      mode: 'supabase',
      isConfigured: true,
      supabaseUrl,
      error: err?.message || 'Connection error',
      tableExists: false,
    };
  }
}

/**
 * Find existing registration by phone
 */
export async function getRegistrationByPhone(phone: string): Promise<Registration | null> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .eq('phone', phone)
        .maybeSingle();

      if (!error && data) {
        return data as Registration;
      }
      if (error) {
        console.warn('Supabase getRegistrationByPhone error:', error.message);
        lastSupabaseError = error.message;
      }
    } catch (err: any) {
      console.error('Supabase query exception:', err);
    }
  }

  // Local fallback
  const list = readLocalRegistrations();
  const found = list.find((item) => item.phone === phone);
  return found || null;
}

/**
 * Create a new registration
 */
export async function createRegistration(payload: {
  fullName: string;
  phone: string;
  email: string;
  numberOfPeople: number;
  message?: string;
}): Promise<{ success: boolean; data?: Registration; error?: string; isDuplicate?: boolean }> {
  // Check for duplicate phone
  const existing = await getRegistrationByPhone(payload.phone);
  if (existing) {
    return {
      success: false,
      isDuplicate: true,
      error: "You're already on the guest list 👀",
    };
  }

  const record: Registration = {
    id:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `reg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    full_name: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    number_of_people: payload.numberOfPeople,
    message: payload.message || '',
    status: 'confirmed',
    registered_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .insert([record])
        .select()
        .single();

      if (error) {
        lastSupabaseError = error.message;
        // Check unique constraint violation
        if (
          error.code === '23505' ||
          error.message.includes('unique') ||
          error.message.includes('duplicate')
        ) {
          return {
            success: false,
            isDuplicate: true,
            error: "You're already on the guest list 👀",
          };
        }

        console.error('Supabase insert error:', error);
        // If on Vercel, report error so host knows to run the table schema
        if (process.env.VERCEL) {
          return {
            success: false,
            error: `Database error: ${error.message}. Please verify the registrations table exists in Supabase.`,
          };
        }
      } else if (data) {
        return { success: true, data: data as Registration };
      }
    } catch (err: any) {
      console.error('Supabase insert exception:', err);
    }
  }

  // Local storage fallback
  const list = readLocalRegistrations();
  if (list.some((item) => item.phone === payload.phone)) {
    return {
      success: false,
      isDuplicate: true,
      error: "You're already on the guest list 👀",
    };
  }

  list.unshift(record);
  writeLocalRegistrations(list);

  return { success: true, data: record };
}

/**
 * Get all registrations for admin
 */
export async function getAllRegistrations(): Promise<Registration[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('registrations')
        .select('*')
        .order('registered_at', { ascending: false });

      if (!error && data) {
        return data as Registration[];
      }
      if (error) {
        console.warn('Supabase getAllRegistrations error:', error.message);
        lastSupabaseError = error.message;
      }
    } catch (err) {
      console.error('Supabase query error:', err);
    }
  }

  return readLocalRegistrations();
}

/**
 * Delete a registration (Admin)
 */
export async function deleteRegistration(id: string): Promise<boolean> {
  let supabaseDeleted = false;
  if (supabase) {
    try {
      const { error } = await supabase.from('registrations').delete().eq('id', id);
      if (!error) {
        supabaseDeleted = true;
      } else {
        console.error('Supabase delete error:', error.message);
      }
    } catch (err) {
      console.error('Supabase delete exception:', err);
    }
  }

  const list = readLocalRegistrations();
  const filtered = list.filter((r) => r.id !== id);
  writeLocalRegistrations(filtered);

  return supabaseDeleted || list.length !== filtered.length;
}
