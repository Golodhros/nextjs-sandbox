import type { NextApiRequest, NextApiResponse } from 'next';

const artificialDelay = 500;
const hardCodedResponse: Data = {
  categories: [
    {
      id: 'category_1',
      title: 'Food + Beverage',
      items: [
        {
          id: 'cat_1_exp_1',
          title: '"Chopped" Cooking Competition',
          host: 'Norcina',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611797697301-HLDC7IKV52O6KN1KJAZU/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/kate-norcina.jpg?format=750w',
        },
        {
          id: 'cat_1_exp_2',
          title: 'NOLA: Tastes + Sounds',
          host: 'UNA',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611797555768-X85L4N1EYILXR6YS8VF1/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/UNA.jpg?format=750w',
        },
        {
          id: 'cat_1_exp_3',
          title: 'Rum Reimagined',
          host: 'Ten to One',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1612923693637-RJGF9JB1OUR3KMO4NUXV/ke17ZwdGBToddI8pDm48kHZ_lZcph6T5oRAKjGPrPhYUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z22TY1zzqWRr18Mc8jbohgzdPzFmC9j5yPnp3asIQmOvTdZR9z9mxWb0yLUToVqwSd/960x0-1.jpg?format=750w',
        },
        {
          id: 'cat_1_exp_4',
          title: 'Ice Cream Tasting',
          // eslint-disable-next-line quotes
          host: "Alec's Ice Cream",
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1608182379643-5I92G9YYLH21M7L9H7Q1/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/ice+cream.jpg?format=750w',
        },
        {
          id: 'cat_1_exp_5',
          title: 'Mixology Cocktail Hour',
          host: 'Suzu',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1608185278371-BCL4WPMIGPTXHMDPI7N5/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/suzu.jpg?format=750w',
        },
        {
          id: 'cat_1_exp_6',
          title: 'High + Dry: N/A Mixology',
          host: 'bonbuz (a non-alcoholic spirit)',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1608665770966-7ZBYDLZXCXSW1NIAB7D4/4.+Bonbuz+Cocktails+-+Fay+Behbehani.jpg?format=750w',
        },
      ],
    },
    {
      id: 'category_2',
      title: 'Entertainment',
      items: [
        {
          id: 'cat_2_exp_1',
          title: 'Virtually Impossible: An Interactive Magic Show',
          host: 'Kevin Blake',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611797648375-RG0EVFUCK8KEAXJ5QC0Z/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/kevin-blake.jpg?format=750w',
        },
        {
          id: 'cat_2_exp_2',
          title: 'Trivia Night',
          host: 'Matt Sterling',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611797672408-LPC8OYS5440LZS3ESJ38/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/Matt+Sterling.jpg?format=750w',
        },
        {
          id: 'cat_2_exp_3',
          title: 'Private Virtual Concert',
          host: 'Sofar Sounds',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611368708174-L2FQCLXJ29XEDMF7VVXM/ke17ZwdGBToddI8pDm48kOogekSh1TgaHgHS1dAd9P1Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxPd_n6sohiW4hfnzFrq19wGdX7G823akV8LNm4RZaiLEctsRm4A4F9JSQC6bk1EAo/77d81a8b416271b01619a53c3a235dfce3e50b17_bee_bakare-losangeles-062218-dulce_balandran-1.jpg?format=750w',
        },
        {
          id: 'cat_2_exp_4',
          title: 'Jeopardy!',
          host: 'Jide and Chloe',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1608699005150-3H7FJQH9XOQPYFYD1AZY/ke17ZwdGBToddI8pDm48kM19vGfAY4CpRvzWg9j4Rs97gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1Ucs6qC7sr7nMoIk6RghKQ5zqaVLBrlbIpJKi9eKqHOg0LjA7Zh6OR0YZYaXtoY39jA/jide+and+chloe.jpg?format=750w',
        },
        {
          id: 'cat_2_exp_5',
          title: 'Soulful Tunes with Lilan',
          host: 'Lilan Kane',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1602482143365-9JEPVL3I9ALLXS8LP93J/lilan.jpg?format=750w',
        },
        {
          id: 'cat_2_exp_6',
          title: 'Virtual Escape Room',
          host: 'The Escape Game',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1608056231658-0F28VD8L90EXTP8ZFT4C/Escape+Game.jpg?format=750w',
        },
      ],
    },
    {
      id: 'category_3',
      title: 'Wellness',
      items: [
        {
          id: 'cat_3_exp_1',
          title: 'Mindful Movements',
          host: 'Evolna',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1607926700154-BA090C6M2BWL1RSLUQSM/IMG_1524+-+Natassia+Miller.JPG?format=750w',
        },
        {
          id: 'cat_3_exp_2',
          title: 'Power Vinyasa',
          host: 'Yoga with Al',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1603169008126-7DY3RH61PVUTPW78WHR4/BC8A6017.jpg?format=750w',
        },
        {
          id: 'cat_3_exp_3',
          title: 'Break the Day - DOSE or LIVE',
          host: 'DAYBREAKER',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1619497383290-NEDEQO950JTUQDLT0JB9/daybreaker.jpeg?format=750w',
        },
        {
          id: 'cat_3_exp_4',
          title: 'Meditation on the Road',
          host: 'Jacquelyn Turner-Haury',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1616622433422-AEVIOZBJM79NMGBIURAX/IMG_4303.jpg?format=750w',
        },
        {
          id: 'cat_3_exp_5',
          title: 'Bringing Back Conversation',
          host: 'Convers(ate)',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1621490086582-13Q1ZLY0YAU92DYQYRWR/conversate3.png?format=750w',
        },
        {
          id: 'cat_3_exp_6',
          title: 'Magic “Monday”: Enhance Your Productivity',
          host: 'Jessica Dogert ft. Magic Mind',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1613461086361-Z38SLOZFU81T9WSU9S0N/DSC_5772.jpg?format=750w',
        },
      ],
    },
    {
      id: 'category_4',
      title: 'Learning',
      items: [
        {
          id: 'cat_4_exp_1',
          title: 'At-Home Beer Brewing',
          host: 'City Brew Tours',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1613085088179-L78YKPG8PP0NEEDXDYQT/AdobeStock_283056284+%281%29+-+Chad+Brodsky.jpeg?format=750w',
        },
        {
          id: 'cat_4_exp_2',
          title: 'Oyster Shucking',
          host: 'Oysters XO ft. Chef Rifko',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1611369367826-HI4H1HBWPYVRRIWI6BIC/1B5AB6A7-61B2-4F49-AECF-698B06686B59+-+rifko+meier.jpeg?format=750w',
        },
        {
          id: 'cat_4_exp_3',
          title: 'DIY Kombucha',
          host: 'Kombucha to the People Ft. Lila Volkas',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1604597279773-UDUAXGLBDZVJUCTKK7Y4/kombucha.jpg?format=750w',
        },
        {
          id: 'cat_4_exp_4',
          title: 'Inclusive Workplace Workshops',
          host: 'ReBoot Accel',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1612920886689-RYTGQHCWK2ICE8K1IMRW/reboot.jpeg?format=750w',
        },
        {
          id: 'cat_4_exp_5',
          title: 'Floral Workshop',
          host: 'Poppy Flowers',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1616511755492-S1DKT4052I8DIESLTGIF/5f723aa6237d7e7456c53ca6_Screen+Shot+2020-09-28+at+3.33.45+PM.png?format=750w',
        },
        {
          id: 'cat_4_exp_6',
          title: 'The Healing Art of Rock Balancing',
          host: 'Travis Ruskus',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1616434322907-11Z16X340Z7ELTJEU548/195+WEALTH+Travis+Ruskus+Self+Portrait+-+Travis+Ruskus.jpg?format=750w',
        },
        {
          id: 'cat_4_exp_7',
          title: 'Candle Making Workshop',
          host: 'After Party Candle Co.',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1616617188159-II1O3UAGOE85QUW0QJDB/IMG_4358.jpg?format=750w',
        },
        {
          id: 'cat_4_exp_8',
          title: 'Hack your Snack',
          host: 'Lila Volkas N.C.',
          img: 'https://images.squarespace-cdn.com/content/v1/5e32662ad4030575760e4e4c/1619502159231-IHR4EG53ZNK2OLX96ZJ6/truffles+on+plate.jpg?format=750w',
        },
      ],
    },
  ],
};
const errorResponse = {
  data: undefined,
  error: 'failed to load data',
};

function someAsyncOperation() {
  return new Promise<Data>((resolve) => {
    setTimeout(() => {
      resolve(hardCodedResponse);
    }, artificialDelay);
  });
}

type Data = {
  categories: any[];
};

type ResponseData = {
  data?: Data;
  error?: string;
};

// req = HTTP incoming message, res = HTTP server response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // const { name, message } = req.body;
  const { category } = req.query;

  console.log('category', category);

  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
    try {
      const data = await someAsyncOperation();

      res.status(200).json({ data });
    } catch (err) {
      res.status(500).json(errorResponse);
    }
  }
}
