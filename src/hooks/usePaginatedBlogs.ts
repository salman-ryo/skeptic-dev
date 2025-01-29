"use client"
import { useState, useEffect } from 'react';

export function usePaginatedBlogs(page: number, limit: number) {
    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchBlogs() {
            setLoading(true);
            try {
                const res = await fetch(`/api/blogs/paginated?page=${page}&limit=${limit}`);
                const data = await res.json();
                if (res.ok) {
                    setBlogs(data.blogs);
                    setTotalPages(data.totalPages);
                } else {
                    throw new Error(data.error || 'Failed to fetch blogs');
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBlogs();
    }, [page, limit]);

    return { blogs, totalPages, loading, error };
}