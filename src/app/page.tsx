'use client';

import axios from 'axios';
import { useState } from 'react';

export default function Home() {
	const [coffeeRecommendation, setCoffeeRecommendation] = useState('');
	//test data
	const pollOutput = { caffeine: 8, flavor: 1, sweetness: 2 };

	const generateRecommendation = async () => {
		try {
			const recommendation = await axios.post('/api/generate', pollOutput, {
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// console.log(recommendation);
			setCoffeeRecommendation(recommendation.data.content);
		} catch (err: any) {
			throw new Error(err.message);
		}
	};

	return (
		<main className='flex flex-col min-h-screen text-center p-4'>
			<div className='m-auto'>
				<button className='' onClick={() => generateRecommendation()}>
					<h1 className='text-2xl p-4'>Generate Coffee Recommendation</h1>
				</button>
				{coffeeRecommendation && (
					<h2 className='text-xl p-2'>{coffeeRecommendation}</h2>
				)}
			</div>
		</main>
	);
}
