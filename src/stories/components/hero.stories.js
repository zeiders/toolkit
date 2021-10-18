import { html } from 'lit';
import { unsafeHTML} from 'lit/directives/unsafe-html.js';

//import { withA11y } from '@storybook/addon-a11y';

import '../../js/components/hero.js';

import heroImage1 from '../assets/hero_fall_quad.jpg';
import heroImage2 from '../assets/hero_genomics.jpg';
import heroImage3 from '../assets/hero_union.jpg';

// importing ./dist/toolkitCss  
// import '../../../dist/toolkit.css';
import '../../css/components.scss';
/* 
  Component expects:
    var(--il-blue)
    var(--il-orange)
    var(--il-content-margin)
    var(--il-content-max-width)
*/

export default {
    title: 'Components/il-hero',
    decorators: [
        (story) => html`
            
           

            <style>
            :root {
                --il-orange: #ff552e;
                --il-blue: #13294b;
                --il-content-max-width: 1140px;
                --il-content-margin: 30px;
            }
            </style>
            ${story()}
        `
    ],
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
            options: ['hero_fall_quad.jpg','hero_genomics.jpg','hero_union.jpg',''],
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




const Template = ({ body, align, alt, background, color, duotone, backgroundURL }) => {

    if (background === 'hero_fall_quad.jpg') backgroundURL = heroImage1;
    if (background === 'hero_genomics.jpg') backgroundURL = heroImage2;
    if (background === 'hero_union.jpg') backgroundURL = heroImage3;

    console.info(`rendering hero story, backgroundURL: '${backgroundURL}'`, arguments)

    return html`
        <il-hero 
            .alt=${alt} 
            .align=${align}
            .background=${backgroundURL}
            .color=${color}
            ?duotone=${duotone}
        >${unsafeHTML(body)}</il-hero>
    `;
}

const sampleHTMLBody = "<h1>Hero Header</h1>" 
    + "<p>This is the body text of the Hero component.  Because it is rendered as a slot, HTML form the hosting page will be applied to the message body.</p>"
    + "<ul><li><a href='#'>Action 1</a></li><li><a href='#'>Action 2</a></li></ul>"


//👇 Each story then reuses that template
export const Primary = Template.bind({});
Primary.storyName = 'Primary';
Primary.args = { 
    body:sampleHTMLBody,
    align: '', 
    alt: 'image alt text', 
    color: 'blue', 
    duotone: false  
};

/* Orange:left */
export const Hero4 = Template.bind({});
Hero4.storyName = 'Hero Orange-Left';
Hero4.args = {
    ...Primary.args, 
    backgroundURL: '',
    color:'orange',
    align:'left'
    };

/* Background Image */
export const Hero2 = Template.bind({});
Hero2.storyName = 'Hero with a background image';
Hero2.args = {
    ...Primary.args, 
    backgroundURL: heroImage1
    };

/* Duotone */
export const Hero3 = Template.bind({});
Hero3.storyName = 'Hero with a background image and duotone';
Hero3.args = {
    ...Primary.args, 
    backgroundURL: heroImage1,
    duotone: true
    };



export const SampleImages = () => html `
    <div style="display:flex;">
    <div style="flex:1 1 33%">
        <div>Fall Quad</div>
        <img width="100%" src=${heroImage1} />
        </div>
    <div style="flex:1 1 33%">
        <div>Genomics</div>
        <img width="100%" src=${heroImage2} />
        </div>
    <div style="flex:1 1 33%">
        <div>Union</div>
        <img width="100%" src=${heroImage3} />
        </div>
    </div>
`;
SampleImages.storyName = 'Sample Images';