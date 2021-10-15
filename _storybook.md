# Using Storybook

## Adding Storybook to an existing project

1. Install storybook globally
2. CD to existing project root folder
3. Initialize storybook `npx sb init`

    This will analyze your project, attempting to detect its framework (React, Angular, WebComponents, etc.).

    It will add a directory `.\src\stories` and populate it with a sample stories and assets.

    It will also add a new directory `.storybook`, and modify package.json adding dependencies and two new tasks `npm run storybook` and `npm run build-storybook`.

4. Run audit `npm audit fix`

    npm audit will identify and attempt to update any referenced packages with known vulnerabities.

5. Run storybook: `npm run storybook` or `yarn storybook`.

    This will start Storybook locally, typically opening it in a new browser window.  If it doesn't open automatically, the URL of the local site will be displayed in the console.

### Example of changes to package.json

This is an example of how running `npx sb init` may modify `pacakges.json`

```diff
{
    "tasks": {
+       "storybook": "start-storybook -p 6006",
+       "build-storybook": "build-storybook"
    }
    ...
    "devDependencies": {
+       "@babel/core": "^7.15.8",
+       "@storybook/addon-actions": "^6.3.12",
+       "@storybook/addon-essentials": "^6.3.12",
+       "@storybook/addon-links": "^6.3.12",
+       "@storybook/web-components": "^6.3.12",
+       "babel-loader": "^8.2.2",
    }
}
```
