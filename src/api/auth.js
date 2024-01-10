const TOKEN_KEY = 'token';

export const getToken = () => {
   return "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYyMzYwNGYyLTlhY2EtNGUyZi1hZGYxLWQyOTQxOTAyODhjZSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL25hbWUiOiIwOTM4NjI4MTU0NSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlN1cGVyQWRtaW4iLCJleHAiOjE3MzYzMjI0MjgsImlzcyI6Imh0dHBzOi8vd2VmaW5kZXIuaXIiLCJhdWQiOiJodHRwczovL3dlZmluZGVyLmlyIn0.BIe1V5c72igkH2qAGWR00gPzxJd2VR7sUvVDW6CT_-U";
};

export const setToken = (token) => {
   JSON.parse(localStorage.setItem(TOKEN_KEY, token));
};

export const deleteToken = () => {
   JSON.parse(localStorage.removeItem(TOKEN_KEY));
};
