// import {
//     generateId,
//     loadApiKey,
//     withoutTrailingSlash,
//   } from '@ai-sdk/provider-utils';
//   import { CustomChatLanguageModel } from './custom-chat-language-model';
//   import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';
  
//   export interface CustomProvider {
//     (
//       modelId: CustomChatModelId,
//       settings?: CustomChatSettings,
//     ): CustomChatLanguageModel;
  
//     chat(
//       modelId: CustomChatModelId,
//       settings?: CustomChatSettings,
//     ): CustomChatLanguageModel;
//   }
  
//   export interface CustomProviderSettings {
//     baseURL?: string;
//     apiKey?: string;
//     headers?: Record<string, string>;
//   }
  
//   export function createCustomProvider(
//     options: CustomProviderSettings = {},
//   ): CustomProvider {
//     const createModel = (
//       modelId: CustomChatModelId,
//       settings: CustomChatSettings = {},
//     ) =>
//       new CustomChatLanguageModel(modelId, settings, {
//         provider: 'custom.chat',
//         baseURL:
//           withoutTrailingSlash(options.baseURL) ?? process.env.LLAMA_API_URL,
//         headers: () => ({
//           Authorization: `Bearer ${loadApiKey({
//             apiKey: options.apiKey,
//             environmentVariableName: 'CUSTOM_API_KEY',
//             description: 'Custom Provider',
//           })}`,
//           ...options.headers,
//         }),
//         generateId: options.generateId ?? generateId,
//       });
  
//     const provider = function (
//       modelId: CustomChatModelId,
//       settings?: CustomChatSettings,
//     ) {
//       if (new.target) {
//         throw new Error(
//           'The model factory function cannot be called with the new keyword.',
//         );
//       }
  
//       return createModel(modelId, settings);
//     };
  
//     provider.chat = createModel;
  
//     return provider as CustomProvider;
//   }
  
//   export const customProvider = createCustomProvider();

import {
    generateId,
    withoutTrailingSlash,
  } from '@ai-sdk/provider-utils';
  import { CustomChatLanguageModel } from './custom-chat-language-model';
  import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';
  
  export interface CustomProvider {
    (
      modelId: CustomChatModelId,
      settings?: CustomChatSettings,
    ): CustomChatLanguageModel;
  
    chat(
      modelId: CustomChatModelId,
      settings?: CustomChatSettings,
    ): CustomChatLanguageModel;
  }
  
  export interface CustomProviderSettings {
    baseURL?: string;
    headers?: Record<string, string>;
  }
  
  export function createCustomProvider(
    options: CustomProviderSettings = {},
  ): CustomProvider {
    const createModel = (
      modelId: CustomChatModelId,
      settings: CustomChatSettings = {},
    ) =>
      new CustomChatLanguageModel(modelId, settings, {
        provider: 'custom.chat',
        baseURL:
          withoutTrailingSlash(options.baseURL) ?? process.env.LLAMA_API_URL,
        headers: () => ({
          ...options.headers,
        }),
        generateId: options.generateId ?? generateId,
      });
  
    const provider = function (
      modelId: CustomChatModelId,
      settings?: CustomChatSettings,
    ) {
      if (new.target) {
        throw new Error(
          'The model factory function cannot be called with the new keyword.',
        );
      }
  
      return createModel(modelId, settings);
    };
  
    provider.chat = createModel;
  
    return provider as CustomProvider;
  }
  
  export const customProvider = createCustomProvider();