import { NextResponse } from 'next/server';
import openai from '@/lib/openai';

export const POST = async (req: Request) => {
	//deconstruct request params
	const { caffeine, flavor, sweetness } = await req.json();

	//fake coffee shop menu options
	const options = {
		drinks: [
			'espresso',
			'double espresso',
			'americano',
			'cortado',
			'latte',
			'cappuccino',
		],
		milks: ['whole', 'oat', 'skim', 'almond', 'half and half', 'macadamia'],
		flavors: [
			'vanilla',
			'caramel',
			'lavender',
			'hazelnut',
			'peppermint',
			'sugar-free vanilla',
		],
		temp: ['iced', 'hot', 'cappuccino'],
		caffeine_levels: [
			'decaf',
			'half-caffeination',
			'full-caffeination',
			'extra-caffeination',
		],
	};

	//checking for valid parameters, if invalid, return error code 404
	if (!caffeine || !flavor || !sweetness) {
		return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 });
	}

	const userPrompt = `I'm thinking of a coffee based drink that has these qualities from 0 to 10, with 10 being the greatest:
	 ${caffeine} in caffeine
	 ${flavor} in flavor
	 ${sweetness} in sweetness
	It needs to be iced and have non-dairy milk.
	The options object is all of the currently available options at the coffee shop.

	${JSON.stringify(options)}

	Please answer in this format: "You should drink ____"`;
	try {
		const res = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo',
			messages: [
				{
					role: 'user',
					content: userPrompt,
				},
			],
		});

		return NextResponse.json(res.data.choices[0].message);
		// return NextResponse.json('Iced Coffee');
	} catch (error: any) {
		return NextResponse.json(error.message);
	}
};
