import Config from 'react-native-config';
import {createClient} from '@supabase/supabase-js';
import {Database} from './supabase.type.ts';
import 'react-native-url-polyfill/auto';

const supabaseUrl = Config.REACT_APP_SUPABASE_URL ?? '';
const supabaseAnonKey = Config.REACT_APP_SUPABASE_KEY ?? '';

export default createClient<Database>(supabaseUrl, supabaseAnonKey);
