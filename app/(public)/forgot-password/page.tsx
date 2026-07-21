'use client';

import Link from 'next/link';
import { useState } from 'react';
import { supabaseBrowserClient } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
	const supabase = supabaseBrowserClient();
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);

	async function handleReset(e: React.FormEvent) {
		e.preventDefault();
		setLoading(true);
		