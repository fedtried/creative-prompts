import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import PromptDashboard from "../../features/dailyPrompt/promptDashboard/PromptDashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {path: '/daily', element: <PromptDashboard/>}
        ]
    }
])