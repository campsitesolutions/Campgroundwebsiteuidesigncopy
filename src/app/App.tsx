import { RouterProvider } from 'react-router';
import { router } from './routes';
import { SectionProvider } from './context/SectionContext';
import { WizardProvider } from './context/WizardContext';

export default function App() {
  return (
    <WizardProvider>
      <SectionProvider>
        <RouterProvider router={router} />
      </SectionProvider>
    </WizardProvider>
  );
}