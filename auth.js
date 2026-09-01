// ============================================================
// SPECTRUM // SUPABASE AUTHENTICATION & EMAIL VERIFICATION
// ============================================================

(function (window) {
  'use strict';

  // Default demo / configured credentials (stored in localStorage or defaulted)
  const AUTH_CONFIG_KEY = 'spectrum_supabase_config';
  const savedConfig = JSON.parse(localStorage.getItem(AUTH_CONFIG_KEY) || '{}');

  const authState = {
    supabaseUrl: savedConfig.url || '',
    supabaseKey: savedConfig.key || '',
    client: null,
    user: null,
    profile: null,
  };

  // Initialize Supabase Client if credentials exist
  function initSupabase() {
    if (window.supabase && authState.supabaseUrl && authState.supabaseKey) {
      try {
        authState.client = window.supabase.createClient(
          authState.supabaseUrl,
          authState.supabaseKey,
          {
            auth: {
              persistSession: true,
              autoRefreshToken: true,
              detectSessionInUrl: true,
            },
          }
        );
        listenToAuth();
      } catch (err) {
        console.error('Supabase initialization error:', err);
      }
    }
  }

  // Auth State Listener
  function listenToAuth() {
    if (!authState.client) return;

    authState.client.auth.onAuthStateChange(async (event, session) => {
      if (session && session.user) {
        authState.user = session.user;
        updateUserUI(session.user);

        // Check if just confirmed email
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
          if (session.user.email_confirmed_at) {
            window.dispatchEvent(new CustomEvent('spectrum:auth_verified', { detail: session.user }));
          }
        }
      } else {
        authState.user = null;
        updateUserUI(null);
      }
    });

    // Check initial session
    authState.client.auth.getSession().then(({ data: { session } }) => {
      if (session && session.user) {
        authState.user = session.user;
        updateUserUI(session.user);
      }
    });
  }

  // Update Header User Button UI
  function updateUserUI(user) {
    const userBtn = document.getElementById('user-auth-btn');
    const userLabel = document.getElementById('user-auth-label');
    const userIcon = document.getElementById('user-auth-icon');
    const certUserName = document.querySelector('.cert-user-name');

    if (user) {
      const displayName = user.user_metadata?.full_name || user.email.split('@')[0];
      if (userLabel) userLabel.textContent = displayName;
      if (userIcon) userIcon.textContent = '🟢';
      if (userBtn) userBtn.title = `Signed in as ${user.email} (Click to Sign Out)`;
      if (certUserName) certUserName.textContent = `${displayName.toUpperCase()} (${user.email})`;
    } else {
      if (userLabel) userLabel.textContent = 'Sign In';
      if (userIcon) userIcon.textContent = '👤';
      if (userBtn) userBtn.title = 'Sign In or Create Account';
      if (certUserName) certUserName.textContent = 'VERIFIED OPERATIVE';
    }
  }

  // Save Credentials from In-App Config Wizard
  function saveCredentials(url, key) {
    authState.supabaseUrl = url.trim();
    authState.supabaseKey = key.trim();
    localStorage.setItem(AUTH_CONFIG_KEY, JSON.stringify({ url: authState.supabaseUrl, key: authState.supabaseKey }));
    initSupabase();
  }

  // Sign Up with Email Verification
  async function signUp(email, password, fullName) {
    if (!authState.client) {
      throw new Error('Supabase project not connected. Please enter your Project URL and Anon Key in Settings.');
    }

    const redirectUrl = window.location.origin + window.location.pathname;
    const { data, error } = await authState.client.auth.signUp({
      email: email.trim(),
      password: password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: fullName.trim() || email.split('@')[0],
        },
      },
    });

    if (error) throw error;
    return data;
  }

  // Sign In with Email and Password
  async function signIn(email, password) {
    if (!authState.client) {
      throw new Error('Supabase project not connected. Please enter your Project URL and Anon Key in Settings.');
    }

    const { data, error } = await authState.client.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) throw error;
    return data;
  }

  // Sign Out
  async function signOut() {
    if (authState.client) {
      await authState.client.auth.signOut();
    }
    authState.user = null;
    updateUserUI(null);
  }

  // Initialize on load
  window.addEventListener('DOMContentLoaded', () => {
    initSupabase();
  });

  // Expose API to Window
  window.SpectrumAuth = {
    state: authState,
    saveCredentials,
    signUp,
    signIn,
    signOut,
    updateUserUI,
  };
})(window);
