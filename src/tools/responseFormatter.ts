
export const formatJsonResponse = (response: any) => {
    return {
        statusCode: 200, 
        body: JSON.stringify(response)
    }
}

export const formatErrorResponse = (error: Error) => {
    return {
        statusCode: 500, 
        body: `${error.name}: ${error.message}`
    }
}