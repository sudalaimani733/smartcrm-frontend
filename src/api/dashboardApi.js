import axiosClient from './axiosClient';

export const getDashboardSummary = () => axiosClient.get('/dashboard/summary');
export const getPipelineValue = () => axiosClient.get('/dashboard/pipeline-value');
export const getConversionRate = () => axiosClient.get('/dashboard/conversion-rate');
export const getRepPerformance = () => axiosClient.get('/dashboard/rep-performance');