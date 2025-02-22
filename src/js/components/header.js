import {LitElement, html, css} from 'lit';
import './unit-wordmark';

class Header extends LitElement {
    static get properties() {
        return {
            compact: {type: String, attribute: true},
            full: {type: String, attribute: true},
            view: {type: String, default: 'full', attribute: true, reflect: true},
            menuVisible: {type: Boolean, attribute: false}
        }
    }

    static get styles() {
        return css`
.header {
    position: relative;
    font-family: var(--il-source-sans);
}

.campus {
    text-transform: uppercase;
}

.campus a:focus {
    outline: none;
    border: none;
}

.campus svg {
    fill: var(--il-blue);
}

.campus a:focus svg, .campus a:hover svg {
    fill: var(--il-altgeld);
    outline: none;
    border: none;
}

.header--full .header__main-outer {
    border-top: 7px solid var(--il-orange);
    border-bottom: 2px solid var(--il-cloud-1);
    background-color: white;
    padding: 0 var(--il-content-margin);
}
.header--full .header__main-inner {
    margin: 0 auto;
    display: grid;
    max-width: var(--il-content-max-width);
    grid-template-columns: auto auto;
    grid-template-rows: auto auto;
    grid-template-areas: "campus links" "wordmark search";
    align-items: center;
}
.header--full .campus {
    grid-area: campus;
    justify-self: left;
    padding: 10px 0px;
}
.header--full .links {
    grid-area: links;
    justify-self: right;
    padding: 10px 0;
}
.header--full .wordmark {
    grid-area: wordmark;
    justify-self: stretch;
    padding: 20px 0;
}
.header--full .search {
    grid-area: search;
    justify-self: right;
    padding: 20px 0;
}
.header--full .navigation {
    background-color: var(--il-cloud-1);
    padding: 0 var(--il-content-margin);
}
.header--full .navigation__inner {
    margin: 0 auto;
    max-width: var(--il-content-max-width);
}

.header--compact .header__main {
    border-top: 7px solid var(--il-orange);
    background-color: white;
    padding: 5px var(--il-content-margin) 10px;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    border-bottom: 2px solid var(--il-cloud-1);
}
.header--compact .header__main .campus {
    grid-column: 1 / span 2;
}
.header--compact .header__main .menu-button {
    padding: 20px 0;
    margin-left: 30px;
    justify-self: flex-end;
}
.header--compact .menu-button button {
    display: inline-block;
    position: relative;
    margin: 0;
    padding: 0 20px 0 40px;
    border: 0;
    border-radius: 4px;
    background-color: var(--il-alma-mater);
    color: white;
    font: 700 20px/44px var(--il-source-sans);
    text-transform: uppercase;
}
.header--compact .menu-button button:focus, .header--compact .menu-button button:hover {
    background-color: var(--il-orange);
    outline: none;
    border: none;
}
.header--compact.header--menu-visible .menu-button button {
    background-color: var(--il-alma-mater-1);
}
.header--compact.header--menu-visible .menu-button button:focus,
.header--compact.header--menu-visible .menu-button button:hover {
    background-color: var(--il-orange);
}
.header--compact .menu-button svg {
    position: absolute;
    left: 14px;
    top: 13px;
    display: block;
    width: 16px;
    height: 16px;
    fill: currentcolor;
}
.header--compact .menu-button svg.menu-icon {
    display: block;
}
.header--compact .menu-button svg.menu-close {
    display: none;
    left: 10px;
    top: 10px;
    width: 24px;
    height: 24px;
}
.header--compact.header--menu-visible .menu-button svg.menu-icon {
    display: none;
}
.header--compact.header--menu-visible .menu-button svg.menu-close {
    display: block;
}
.header--compact .menu {
    display: none;
    width: 100%;
    max-width: 500px;
    position: absolute;
    top: 100%;
    right: 0;
    box-shadow: -10px 10px 10px rgba(0, 0, 0, .25);
    z-index: 5000;
}
.header--compact .menu .search {
    background-color: white;
    padding: 1em;
}
.header--compact .menu .navigation {
    background-color: var(--il-cloud-1);
}
.header--compact.header--menu-visible .menu {
    display: block;
}

@media only screen and (max-width: 767px) {
    .header--compact .header__main .campus {
        display: none;
    }

    .header--compact .header__main {
        padding-top: 23px;
    }
}
        `;
    }

    constructor() {
        super();
        this.view = this.determineView();
        this.menuVisible = false;
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        window.addEventListener('DOMContentLoaded', this.handleContentLoaded.bind(this));
        document.addEventListener('click', this.handleDocumentClick.bind(this));
        this.handleWindowResize();
    }

    get view() {
        return this._view;
    }

    set view(newView) {
        const oldView = this._view;
        if (oldView !== newView) {
            this._view = newView;
            this.requestUpdate('view', oldView);
            this.updateComplete.then(() => {
                const evt = new CustomEvent('viewChange', {detail: newView});
                this.dispatchEvent(evt);
            });
        }
    }

    determineView() {
        let isCompact = false;
        if (this.compact) {
            isCompact = window.matchMedia(this.compact).matches;
        }
        else if (this.full) {
            isCompact = !window.matchMedia(this.full).matches;
        }
        else {
            isCompact = window.matchMedia('(max-width: 992px)').matches;
        }
        return isCompact ? 'compact' : 'full';
    }

    isCompactView() {
        return this.view === 'compact';
    }

    isFullView() {
        return this.view === 'full';
    }

    // Event handlers

    handleContentLoaded(evt) {
        this.view = this.determineView();
    }

    handleDocumentClick(evt) {
        if (this.isCompactView() && this.menuVisible) {
            if (this.shadowRoot.querySelector('#menu').contains(evt.target)) {
                return;
            }
            if (this.querySelector('[slot="search"]').contains(evt.target)) {
                return;
            }
            if (this.querySelector('[slot="navigation"]').contains(evt.target)) {
                return;
            }
            if (this.querySelector('[slot="links"]').contains(evt.target)) {
                return;
            }
            this.menuVisible = false;
        }
    }

    handleMenuButtonClick(evt) {
        evt.stopPropagation();
        this.menuVisible = !this.menuVisible;
    }

    handleWindowResize(evt) {
        this.view = this.determineView();
    }

    // Rendering

    renderCampusWordmark() {
        return html`<a href="https://illinois.edu"><svg width="362" height="10" xmlns="http://www.w3.org/2000/svg">
            <title>University of Illinois Urbana-Champaign</title>
            <path d="M4.193 9.144c2.388 0 3.804-1.368 3.804-3.84V.6h-1.92v4.632c0 1.596-.684 2.256-1.872 2.256-1.176 0-1.872-.66-1.872-2.256V.6H.389v4.704c0 2.472 1.416 3.84 3.804 3.84zM13.587 9V3.9L17.775 9h1.596V.6h-1.92v5.1L13.275.6h-1.608V9h1.92zm11.47 0V.6h-1.944V9h1.944zm8.134 0L36.827.6h-1.932l-2.592 6-2.556-6h-2.1L31.271 9h1.92zm12.586 0V7.44h-4.572V5.496h3.9V3.984h-3.9V2.16h4.416V.6h-6.348V9h6.504zm5.242 0V6.66h1.788L54.427 9h2.088l-1.884-2.7c1.092-.468 1.728-1.392 1.728-2.652C56.359 1.764 54.955.6 52.711.6h-3.636V9h1.944zm1.584-3.888h-1.584V2.184h1.584c1.188 0 1.788.54 1.788 1.464 0 .912-.6 1.464-1.788 1.464zm9.802 4.032c2.4 0 3.564-1.2 3.564-2.604 0-3.084-4.884-2.016-4.884-3.564 0-.528.444-.96 1.596-.96.744 0 1.548.216 2.328.66l.6-1.476c-.78-.492-1.86-.744-2.916-.744-2.388 0-3.54 1.188-3.54 2.616 0 3.12 4.884 2.04 4.884 3.612 0 .516-.468.9-1.62.9-1.008 0-2.064-.36-2.772-.876l-.66 1.464c.744.576 2.088.972 3.42.972zM70.995 9V.6h-1.944V9h1.944zm7.426 0V2.184h2.688V.6h-7.32v1.584h2.688V9h1.944zm9.358 0V6.024L91.043.6h-1.908l-2.244 3.732L84.647.6h-2.064L85.835 6v3h1.944zm15.044.144c2.64 0 4.596-1.836 4.596-4.344S105.463.456 102.823.456c-2.652 0-4.596 1.848-4.596 4.344 0 2.496 1.944 4.344 4.596 4.344zm0-1.656c-1.5 0-2.628-1.092-2.628-2.688s1.128-2.688 2.628-2.688c1.5 0 2.628 1.092 2.628 2.688s-1.128 2.688-2.628 2.688zM112.577 9V5.94h3.888V4.38h-3.888V2.16h4.404V.6h-6.348V9h1.944zm14.564 0V.6h-1.944V9h1.944zm9.898 0V7.416h-4.212V.6h-1.944V9h6.156zm8.998 0V7.416h-4.212V.6h-1.944V9h6.156zm4.786 0V.6h-1.944V9h1.944zm5.662 0V3.9l4.188 5.1h1.596V.6h-1.92v5.1L156.173.6h-1.608V9h1.92zm13.594.144c2.64 0 4.596-1.836 4.596-4.344S172.719.456 170.079.456c-2.652 0-4.596 1.848-4.596 4.344 0 2.496 1.944 4.344 4.596 4.344zm0-1.656c-1.5 0-2.628-1.092-2.628-2.688s1.128-2.688 2.628-2.688c1.5 0 2.628 1.092 2.628 2.688s-1.128 2.688-2.628 2.688zM179.833 9V.6h-1.944V9h1.944zm6.502.144c2.4 0 3.564-1.2 3.564-2.604 0-3.084-4.884-2.016-4.884-3.564 0-.528.444-.96 1.596-.96.744 0 1.548.216 2.328.66l.6-1.476c-.78-.492-1.86-.744-2.916-.744-2.388 0-3.54 1.188-3.54 2.616 0 3.12 4.884 2.04 4.884 3.612 0 .516-.468.9-1.62.9-1.008 0-2.064-.36-2.772-.876l-.66 1.464c.744.576 2.088.972 3.42.972zm15.524 0c2.388 0 3.804-1.368 3.804-3.84V.6h-1.92v4.632c0 1.596-.684 2.256-1.872 2.256-1.176 0-1.872-.66-1.872-2.256V.6h-1.944v4.704c0 2.472 1.416 3.84 3.804 3.84zM211.277 9V6.66h1.788l1.62 2.34h2.088l-1.884-2.7c1.092-.468 1.728-1.392 1.728-2.652 0-1.884-1.404-3.048-3.648-3.048h-3.636V9h1.944zm1.584-3.888h-1.584V2.184h1.584c1.188 0 1.788.54 1.788 1.464 0 .912-.6 1.464-1.788 1.464zM224.247 9c2.208 0 3.36-.84 3.36-2.292 0-1.056-.6-1.776-1.536-2.076.684-.36 1.116-1.008 1.116-1.848 0-1.308-1.08-2.184-3.18-2.184h-4.104V9h4.344zm-.48-4.956h-1.932v-1.98h1.932c.948 0 1.464.324 1.464.984 0 .66-.516.996-1.464.996zm.336 3.492h-2.268V5.46h2.268c1.008 0 1.548.336 1.548 1.044 0 .72-.54 1.032-1.548 1.032zM231.721 9l.744-1.8h3.9l.744 1.8h2.04L235.393.6h-1.92L229.729 9h1.992zm4.032-3.276h-2.664l1.332-3.216 1.332 3.216zM243.695 9V3.9l4.188 5.1h1.596V.6h-1.92v5.1L243.383.6h-1.608V9h1.92zm10.414 0l.744-1.8h3.9l.744 1.8h2.04L257.781.6h-1.92L252.117 9h1.992zm4.032-3.276h-2.664l1.332-3.216 1.332 3.216zm8.77.648v-1.5h-3.396v1.5h3.396zm7.426 2.772c1.464 0 2.676-.528 3.468-1.5l-1.248-1.152c-.564.66-1.272.996-2.112.996-1.572 0-2.688-1.104-2.688-2.688s1.116-2.688 2.688-2.688c.84 0 1.548.336 2.112.984l1.248-1.152c-.792-.96-2.004-1.488-3.456-1.488-2.616 0-4.56 1.812-4.56 4.344s1.944 4.344 4.548 4.344zm8.47-.144V5.556h3.816V9h1.944V.6h-1.944v3.312h-3.816V.6h-1.944V9h1.944zm10.39 0l.744-1.8h3.9l.744 1.8h2.04L296.869.6h-1.92L291.205 9h1.992zm4.032-3.276h-2.664l1.332-3.216 1.332 3.216zM305.075 9V4.068l2.46 4.044h.876l2.472-4.152.012 5.04h1.824l-.024-8.4h-1.596l-3.096 5.22L304.859.6h-1.608V9h1.824zm13.33 0V6.684h1.692c2.244 0 3.648-1.164 3.648-3.036 0-1.884-1.404-3.048-3.648-3.048h-3.636V9h1.944zm1.584-3.9h-1.584V2.184h1.584c1.188 0 1.788.54 1.788 1.464 0 .912-.6 1.452-1.788 1.452zm7.354 3.9l.744-1.8h3.9l.744 1.8h2.04L331.015.6h-1.92L325.351 9h1.992zm4.032-3.276h-2.664l1.332-3.216 1.332 3.216zM339.341 9V.6h-1.944V9h1.944zm7.798.144c1.2 0 2.472-.372 3.396-1.068V4.668h-1.776v2.46c-.492.264-.984.36-1.512.36-1.608 0-2.724-1.116-2.724-2.688 0-1.596 1.116-2.688 2.748-2.688.852 0 1.56.3 2.172.948l1.248-1.152c-.816-.948-2.04-1.452-3.516-1.452-2.676 0-4.62 1.812-4.62 4.344s1.944 4.344 4.584 4.344zM356.005 9V3.9l4.188 5.1h1.596V.6h-1.92v5.1L355.693.6h-1.608V9h1.92z"/>
        </svg></a>`;
    }

    renderCompactView() {
        return html`
<div class="header header--compact ${this.menuVisible ? 'header--menu-visible' : ''}">
    <div class="header__main">
        <div class="campus">
            ${this.renderCampusWordmark()}
        </div>
        <div class="wordmark">
            <slot name="wordmark"></slot>
        </div>
        <div class="menu-button">
            <button aria-controls="menu" aria-expanded=${this.menuVisible ? 'true' : 'false'} @click=${this.handleMenuButtonClick}>
                <svg class="menu-icon" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 51.26 51.26"><path d="M4.81 13h41.64a4.81 4.81 0 000-9.62H4.81a4.81 4.81 0 000 9.62zM46.45 21.27H4.81a4.81 4.81 0 000 9.62h41.64a4.81 4.81 0 000-9.62zM46.45 39.13H4.81a4.81 4.81 0 000 9.62h41.64a4.81 4.81 0 000-9.62z"/></svg>
                <svg class="menu-close" role="presentation" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
                <span>Menu</span>
            </button>
        </div>
    </div>
    <div id="menu" class="menu">
        <div class="search">
            <slot name="search"></slot>
        </div>
        <div class="navigation">
            <slot name="navigation"></slot>
        </div>
        <div class="links">
            <slot name="links"></slot>
        </div>
    </div>
</div>
        `;
    }

    renderFullView() {
        return html`
<div class="header header--full">
    <div class="header__main-outer">
        <div class="header__main-inner">
            <div class="campus">
                ${this.renderCampusWordmark()}
            </div>
            <div class="wordmark">
                <slot name="wordmark"></slot>
            </div>
            <div class="links">
                <slot name="links"></slot>
            </div>
            <div class="search">
                <slot name="search"></slot>
            </div>
        </div>
    </div>
    <div class="navigation">
        <div class="navigation__inner">
            <slot name="navigation"></slot>
        </div>
    </div>
</div>
        `;
    }

    render() {
        return this.isFullView() ? this.renderFullView() : this.renderCompactView();
    }
}

customElements.define('il-header', Header);
