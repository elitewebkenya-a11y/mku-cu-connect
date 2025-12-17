import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const input = await req.json();
    console.log('Callback received:', JSON.stringify(input));

    if (!input || !input.status) {
      return new Response(
        JSON.stringify({ error: 'Invalid callback data' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const response = input.response;
    if (!response) {
      return new Response(
        JSON.stringify({ error: 'Invalid callback data - no response' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const userReference = response.User_Reference || response.ExternalReference;
    const statusText = response.Status;

    if (!userReference || !statusText) {
      console.error('Missing User_Reference or Status in response');
      return new Response(
        JSON.stringify({ error: "Missing 'User_Reference' or 'Status' in response" }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const statusMap: Record<string, string> = {
      'success': 'success',
      'failed': 'failed',
      'cancelled': 'failed',
      'pending': 'pending'
    };

    const status = statusMap[statusText.toLowerCase()] || 'pending';

    // Update payment in database
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const supabase = createClient(supabaseUrl!, supabaseKey!);

    const { error: updateError } = await supabase
      .from('payments')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('external_reference', userReference);

    if (updateError) {
      console.error('Database update error:', updateError);
    }

    console.log(`Payment ${userReference} updated to status: ${status}`);

    return new Response(
      JSON.stringify({ status: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Callback error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
