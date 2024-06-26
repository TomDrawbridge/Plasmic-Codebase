// pages/api/getMealTemplateList.js
export default async function handler(req, res) {
    // Check if the API is enabled via environment variable
    if (process.env.ENABLE_TRAINERIZE !== 'true') {
        return res.status(503).json({ message: 'API does not exist' });
    }

    if (req.method === 'GET') {
        const allowedEndpoints = {
            getMealTemplateList: 'https://api.trainerize.com/v03/dailyNutrition/getMealTemplateList',
            getMealTemplate: 'https://api.trainerize.com/v03/dailyNutrition/getMealTemplate',
            getClientList: 'https://api.trainerize.com/v03/user/getClientList',
            getClientSummary: 'https://api.trainerize.com/v03/user/getClientSummary',
            // Add more endpoints as needed
        };

        // Extract the endpoint from the query string
        const { endpoint } = req.query;
        console.log("Requested endpoint:", endpoint); // Log the requested endpoint

        if (!allowedEndpoints[endpoint]) {
            return res.status(403).json({ message: 'Endpoint is not allowed' });
        }

        try {
            // Common parameters
            const { start = 0, count = 10, groupId = 260206, mealTemplateId = 0, sort = "dateAdded" } = req.query;

            // Build the request body based on the endpoint
            let requestBody = {
                start: parseInt(start),
                count: parseInt(count),
                groupId: parseInt(groupId),
                mealTemplateId: parseInt(mealTemplateId),
                sort: sort,
            };

            // Add userID only for endpoints that require it
            if (endpoint !== 'getClientList') {
                requestBody.userID = parseInt(req.query.userID || 123456);  // Default userID if not provided
            }

            const response = await fetch(allowedEndpoints[endpoint], {
                method: 'POST', // Adjust method as necessary per endpoint
                headers: {
                    'Authorization': `Basic ${process.env.TRAINERIZE_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                res.status(response.status).json({ message: 'Failed to fetch data from Trainerize API' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Server error', error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
