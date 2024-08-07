const { request, gql } = require('graphql-request');

async function fetchDynamicPaths_1Hire() {
    const ENDPOINT = 'https://cloud.caisy.io/api/v3/e/856911e2-e7e3-4a7a-bd7a-274d7ab2a6ae/graphql';

    const GET_ALL_SERVICES = gql`
    query MyQuery {
      allService {
        edges {
          node {
            pageSlug
            servicecategory {
              slug
            }
          }
        }
      }
    }
  `;

    const GET_ALL_CATEGORIES = gql`
    query MyQuery {
      allProductServiceCategory {
        edges {
          node {
            categoryName
          }
        }
      }
    }
  `;

    const headers = {
        "x-caisy-apikey": "flCSpcFI7TMgpIWOxHkIVbunAPi4UwUm"
    };

    const serviceData = await request(ENDPOINT, GET_ALL_SERVICES, undefined, headers);
    const categoryData = await request(ENDPOINT, GET_ALL_CATEGORIES, undefined, headers);

    const servicePaths = serviceData.allService.edges.map(edge => `/services/${edge.node.servicecategory.slug}/${edge.node.pageSlug}`);
    const categoryPaths = categoryData.allProductServiceCategory.edges.map(edge => `/services/${edge.node.categoryName}`);

    const result = [...servicePaths, ...categoryPaths];
    console.log("Result from fetchDynamicPaths:", result);
    return result.length ? result : [];

}

const axios = require('axios');

async function fetchDynamicPaths_WMSH() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    const TOKEN = process.env.DIRECTUS_TOKEN;
    const headers = TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {};

    try {
        // Fetch blog posts ID list
        const blogPostsResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts?filter[status][_eq]=published`, { headers });
        const blogPostsIds = blogPostsResponse.data.data.map(post => post.id) || [];

        // Fetch individual blog posts and generate paths
        const blogPostPaths = [];
        for (const postId of blogPostsIds) {
            const postResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts/${postId}`, { headers });
            const slug = postResponse.data.data.slug;
            blogPostPaths.push(`/blog/post/${slug}`);
        }

        // Combine and return result
        const result = [...blogPostPaths];
        console.log("Result from fetchDynamicPaths:", result);
        return result.length ? result : [];

    } catch (error) {
        console.error('Error fetching data from Directus:', error);
        return [];
    }
}

async function fetchDynamicPaths_Generic() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    const TOKEN = process.env.DIRECTUS_TOKEN;
    const headers = TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {};

    try {
        // Fetch blog posts ID list
        const blogPostsResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts`, { headers });
        const blogPostsIds = blogPostsResponse.data.data.map(post => post.id) || [];

        // Fetch individual blog posts and generate paths
        const blogPostPaths = [];
        for (const postId of blogPostsIds) {
            const postResponse = await axios.get(`${ENDPOINT}/items/Blog_Posts/${postId}`, { headers });
            const slug = postResponse.data.data.slug;
            blogPostPaths.push(`/blog/post/${slug}`);
        }


        // Combine and return result
        const result = [...blogPostPaths];
        console.log("Result from fetchDynamicPaths:", result);
        return result.length ? result : [];

    } catch (error) {
        console.error('Error fetching data from Directus:', error);
        return [];
    }
}
async function fetchDynamicPaths_DeluxeEscorts() {
    const ENDPOINT = process.env.DIRECTUS_ENDPOINT;
    const TOKEN = process.env.DIRECTUS_TOKEN;
    const headers = TOKEN ? { 'Authorization': `Bearer ${TOKEN}` } : {};

    try {
        // Fetch blog posts ID list
        const blogPostsResponse = await axios.get(`${ENDPOINT}/items/blog_posts`, { headers });
        const blogPostsIds = blogPostsResponse.data.data.map(post => post.id) || [];

        // Fetch individual blog posts and generate paths
        const blogPostPaths = [];
        for (const postId of blogPostsIds) {
            const postResponse = await axios.get(`${ENDPOINT}/items/blog_posts/${postId}`, { headers });
            const slug = postResponse.data.data.slug;
            blogPostPaths.push(`/blog/post/${slug}`);
        }

        // Fetch escorts ID list
        const escortsResponse = await axios.get(`${ENDPOINT}/items/escorts`, { headers });
        const escortsIds = escortsResponse.data.data.map(escort => escort.id) || [];

        // Fetch individual escorts and generate paths
        const escortPaths = [];
        for (const escortId of escortsIds) {
            const escortResponse = await axios.get(`${ENDPOINT}/items/escorts/${escortId}`, { headers });
            const url = escortResponse.data.data.url;
            escortPaths.push(`/escorts/${url}`);
        }

        // Combine blog post paths and escort paths
        const result = [...blogPostPaths, ...escortPaths];
        console.log("Result from fetchDynamicPaths:", result);
        return result.length ? result : [];

    } catch (error) {
        console.error('Error fetching data from Directus:', error);
        return [];
    }
}

module.exports = {
    fetchDynamicPaths_1Hire,
    fetchDynamicPaths_WMSH,
    fetchDynamicPaths_Generic,
    fetchDynamicPaths_DeluxeEscorts
};
