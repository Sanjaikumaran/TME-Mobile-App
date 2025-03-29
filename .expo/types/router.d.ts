/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string | object = string> {
      hrefInputParams: { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/AddTransactionScreen` | `/screens/AddTransactionScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/HomeScreen` | `/screens/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/LoginScreen` | `/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/SignupScreen` | `/screens/SignupScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/MyTransactionsScreen` | `/screens/MyTransactionsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/database/database`; params?: Router.UnknownInputParams; } | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
      hrefOutputParams: { pathname: Router.RelativePathString, params?: Router.UnknownOutputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownOutputParams } | { pathname: `/_sitemap`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/screens/AddTransactionScreen` | `/screens/AddTransactionScreen`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/screens/HomeScreen` | `/screens/HomeScreen`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/screens/LoginScreen` | `/screens/LoginScreen`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/screens/SignupScreen` | `/screens/SignupScreen`; params?: Router.UnknownOutputParams; } | { pathname: `${'/(tab)'}/screens/MyTransactionsScreen` | `/screens/MyTransactionsScreen`; params?: Router.UnknownOutputParams; } | { pathname: `/database/database`; params?: Router.UnknownOutputParams; } | { pathname: `/+not-found`, params: Router.UnknownOutputParams & {  } };
      href: Router.RelativePathString | Router.ExternalPathString | `/_sitemap${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}${`?${string}` | `#${string}` | ''}` | `/${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/screens/AddTransactionScreen${`?${string}` | `#${string}` | ''}` | `/screens/AddTransactionScreen${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/screens/HomeScreen${`?${string}` | `#${string}` | ''}` | `/screens/HomeScreen${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/screens/LoginScreen${`?${string}` | `#${string}` | ''}` | `/screens/LoginScreen${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/screens/SignupScreen${`?${string}` | `#${string}` | ''}` | `/screens/SignupScreen${`?${string}` | `#${string}` | ''}` | `${'/(tab)'}/screens/MyTransactionsScreen${`?${string}` | `#${string}` | ''}` | `/screens/MyTransactionsScreen${`?${string}` | `#${string}` | ''}` | `/database/database${`?${string}` | `#${string}` | ''}` | { pathname: Router.RelativePathString, params?: Router.UnknownInputParams } | { pathname: Router.ExternalPathString, params?: Router.UnknownInputParams } | { pathname: `/_sitemap`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}` | `/`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/AddTransactionScreen` | `/screens/AddTransactionScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/HomeScreen` | `/screens/HomeScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/LoginScreen` | `/screens/LoginScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/SignupScreen` | `/screens/SignupScreen`; params?: Router.UnknownInputParams; } | { pathname: `${'/(tab)'}/screens/MyTransactionsScreen` | `/screens/MyTransactionsScreen`; params?: Router.UnknownInputParams; } | { pathname: `/database/database`; params?: Router.UnknownInputParams; } | `/+not-found` | { pathname: `/+not-found`, params: Router.UnknownInputParams & {  } };
    }
  }
}
