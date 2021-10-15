import { html } from 'lit';
import { unsafeHTML} from 'lit/directives/unsafe-html.js';
import './hero.js';

import heroImage1 from '../../stories/assets/hero_fall_quad.jpg';
import heroImage2 from '../../stories/assets/hero_genomics.jpg';
import heroImage3 from '../../stories/assets/hero_union.jpg';



export default {
    title: 'Components/il-hero',
    argTypes: {

        
        background: {
            name: 'background (demos)',
            description: 'URL of a hero image',
            type: { name: 'string', required: false },
            defaultValue: '',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
              },
            options: ['hero_fall_quad.jpg','hero_genomics.jpg','hero_union.jpg','custom URL'],
            control: {type: 'radio'}
        },

        backgroundURL: {
            name: 'background (manual)',
            description: 'URL of a hero image',
            type: { name: 'string', required: false },
            defaultValue: '',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },

        body: {
            description: 'HTML of hero message',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },

        align: {
            description: 'Position of HTML block within Hero',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' },
            },
            options: ['left','right','top','bottom','center'],
            control: {type: 'radio'}
        },

        alt: {
            description: 'Alternate text for Hero image',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '' },
            },
        },

        color: {
            description: 'Color Theme',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'blue' },
            },
            options: ['blue','orange'],
            control: {type: 'radio'}
        }
    }
  };

/* 
  Component expects:

    var(--il-blue)
    var(--il-orange)
    var(--il-content-margin)
    var(--il-content-max-width)


*/


const Template = ({ body, align, alt, background, color, duotone, backgroundURL }) => {

    if (background === 'hero_fall_quad.jpg') backgroundURL = heroImage1;
    if (background === 'hero_genomics.jpg') backgroundURL = heroImage2;
    if (background === 'hero_union.jpg') backgroundURL = heroImage3;

    return html`
        <style>
            :root {
                --il-orange: #ff552e;
                --il-blue: #13294b;
                --il-content-max-width: 1140px;
                --il-content-margin: 30px;
            }
        </style>

        <div>Component Example</div>

        <il-hero 
            .alt=${alt} 
            .align=${align}
            .background=${backgroundURL}
            .color=${color}
            ?duotone=${duotone}
        >${unsafeHTML(body)}</il-hero>

        <pre>${JSON.stringify(arguments[0])}</pre>
    `;
}

//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = { 
    body:"Hero Message",
    align: '', 
    alt: 'image alt text', 
    background: 'https://static.vecteezy.com/system/resources/previews/000/701/690/large_2x/abstract-polygonal-banner-background-vector.jpg',
    color: 'red', 
    duotone: false  
};

export const Secondary = () => html `
    <div>Hero Indeed</div>
    <img src=${heroImage1} />
    <img src=${heroImage2} />
    <img src=${heroImage3} />

    <il-hero>Hero Component</il-hero>
`;
Secondary.storyName = 'Secondary';