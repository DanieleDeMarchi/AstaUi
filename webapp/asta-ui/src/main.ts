import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import router from './router'

import './style.css'
import 'primeicons/primeicons.css'

// --- DEV ONLY ---
// Import the mock backend service to expose it for debugging.
//import { mockBackendService } from './service/mock-backend.service'
// --- END DEV ONLY ---

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false
    }
  }
})

app.use(ToastService)

// --- DEV ONLY ---
// This block will be removed in the production build by Vite.
if (import.meta.env.DEV) {
  // Expose the mock backend to the window object for easy console access.
  //(window as any).astaMock = mockBackendService
  console.log(
    '%cASTAUI MOCK BACKEND ENABLED',
    'color: #4CAF50; font-weight: bold; font-size: 14px;'
  )
  console.log('Access it via the `astaMock` object in the console.')
}
// --- END DEV ONLY ---

app.mount('#app')

