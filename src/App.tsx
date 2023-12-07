import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Layout from './components/Layout';

import * as router from './routes';

function App() {
    return (
        <Suspense fallback={<div>Loading ...</div>}>
            <Layout>
                <Routes>
                    <Route path="/" element={<router.Home />} />
                    <Route path="/signin" element={<router.Signin />} />

                    <Route path="/stream" element={<router.Stream />} />
                </Routes>
            </Layout>
        </Suspense>
    );
}

export default App;
