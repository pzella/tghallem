import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY ?? '';

const storage =
  Platform.OS === 'web'
    ? {
        getItem: (key: string) => Promise.resolve(typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null),
        setItem: (key: string, value: string) => {
          if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
          return Promise.resolve();
        },
        removeItem: (key: string) => {
          if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
          return Promise.resolve();
        },
      }
    : AsyncStorage;

// Typed queries use `src/lib/database.types.ts`; the client stays untyped because
// `@supabase/supabase-js` Database generics expect the exact CLI generator shape.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
