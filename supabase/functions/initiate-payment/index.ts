import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

function normalizePhoneNumber(phone: string): string {
  phone = phone.trim().replace(/\D+/g, '');
  
  if (/^254\d{9}$/.test(phone)) {
    return phone;
  } else if (/^07\d{8}$/.test(phone)) {
    return '254' + phone.substring(1);
  } else if (/^011\d{7}$/.test(phone)) {
    return '254' + phone.substring(1);
  } else if (/^\+254\d{9}$/.test(phone)) {
    return phone.substring(1);
  }
  return phone;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { phone, amount, payment_type, donor_name } = await req.json();

    if (!phone || !amount || amount <= 0) {
      return new Response(
        JSON.stringify({ status: 'error', error: 'Phone and valid amount required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }

    const normalizedPhone = normalizePhoneNumber(phone);
    
    const apiUsername = Deno.env.get('PAYHERO_API_USERNAME');
    const apiPassword = Deno.env.get('PAYHERO_API_PASSWORD');
    const channelId = parseInt(Deno.env.get('PAYHERO_CHANNEL_ID') || '3028');

    if (!apiUsername || !apiPassword) {
      console.error('PayHero credentials not configured');
      return new Response(
        JSON.stringify({ status: 'error', error: 'Payment service not configured' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
      );
    }

    const externalReference = `TXN-${Date.now()}-${Math.floor(Math.random() * 9000) + 1000}`;
    
    // Get the function URL for callback
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const callbackUrl = `${supabaseUrl}/functions/v1/payment-callback`;

    const paymentData = {
      amount: parseFloat(amount),
      phone_number: normalizedPhone,
      channel_id: channelId,
      provider: "m-pesa",
      external_reference: externalReference,
      customer_name: donor_name || "MKU CU Member",
      callback_url: callbackUrl
    };

    console.log('Initiating payment:', { ...paymentData, phone_number: '***' });

    const response = await fetch('https://backend.payhero.co.ke/api/v2/payments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${apiUsername}:${apiPassword}`)
      },
      body: JSON.stringify(paymentData)
    });

    const responseData = await response.json();
    console.log('PayHero response:', response.status, responseData);

    if (response.ok) {
      // Save payment to database
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
      const supabase = createClient(supabaseUrl!, supabaseKey!);

      const { error: dbError } = await supabase.from('payments').insert({
        external_reference: externalReference,
        phone_number: normalizedPhone,
        amount: parseFloat(amount),
        status: 'pending',
        payment_type: payment_type || 'tithe',
        donor_name: donor_name || null
      });

      if (dbError) {
        console.error('Database error:', dbError);
      }

      return new Response(
        JSON.stringify({ status: 'success', reference: externalReference }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({ status: 'error', error: responseData.message || 'Payment initiation failed' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      );
    }
  } catch (error: unknown) {
    console.error('Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ status: 'error', error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
