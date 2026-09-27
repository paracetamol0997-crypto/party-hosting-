import { createClient, SupabaseClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

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

// Local fallback store file path
const DATA_DIR = path.join(process.cwd(), 'data');
const LOCAL_DB_PATH = path.join(DATA_DIR, 'registrations.json');

function ensureLocalDbExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(LOCAL_DB_PATH)) {
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

function readLocalRegistrations(): Registration[] {
  try {
    ensureLocalDbExists();
    const raw = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
    return JSON.parse(raw) as Registration[];
  } catch (err) {
    console.error('Error reading local db:', err);
    return [];
  }
}

function writeLocalRegistrations(data: Registration[]) {
  try {
    ensureLocalDbExists();
    fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Error writing to local db:', err);
  }
}

// Supabase client instance (if configured)
let supabase: SupabaseClient | null = null;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY;

if (supabaseUrl && supabaseKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseKey);
  } catch (err) {
    console.warn('Could not initialize Supabase client:', err);
  }
}

export function isUsingSupabase(): boolean {
  return Boolean(supabase);
}

/**
 * Find existing registration by phone
 */
export async function getRegistrationByPhone(phone: string): Promise<Registration | null> {
  if (supabase) {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .eq('phone', phone)
      .maybeSingle();

    if (error) {
      console.error('Supabase getRegistrationByPhone error:', error);
      // Fallback to local if table doesn't exist yet or connection fails
    } else if (data) {
      return data as Registration;
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
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `reg_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
    full_name: payload.fullName,
    phone: payload.phone,
    email: payload.email,
    number_of_people: payload.numberOfPeople,
    message: payload.message || '',
    status: 'confirmed',
    registered_at: new Date().toISOString(),
  };

  if (supabase) {
    const { data, error } = await supabase
      .from('registrations')
      .insert([record])
      .select()
      .single();

    if (error) {
      // Check if it was unique constraint violation
      if (error.code === '23505' || error.message.includes('unique') || error.message.includes('duplicate')) {
        return {
          success: false,
          isDuplicate: true,
          error: "You're already on the guest list 👀",
        };
      }
      console.error('Supabase insert error, falling back to local:', error);
    } else if (data) {
      return { success: true, data: data as Registration };
    }
  }

  // Local file storage
  const list = readLocalRegistrations();
  // Double-check local duplicate
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
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('registered_at', { ascending: false });

    if (!error && data) {
      return data as Registration[];
    }
    console.warn('Supabase getAllRegistrations error, using local fallback:', error);
  }

  return readLocalRegistrations();
}

/**
 * Delete a registration (Admin)
 */
export async function deleteRegistration(id: string): Promise<boolean> {
  let supabaseDeleted = false;
  if (supabase) {
    const { error } = await supabase.from('registrations').delete().eq('id', id);
    if (!error) {
      supabaseDeleted = true;
    } else {
      console.error('Supabase delete error:', error);
    }
  }

  const list = readLocalRegistrations();
  const filtered = list.filter((r) => r.id !== id);
  writeLocalRegistrations(filtered);

  return supabaseDeleted || list.length !== filtered.length;
}
