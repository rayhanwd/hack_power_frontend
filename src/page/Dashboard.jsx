import React from 'react'
import DataTable from '../components/DataTable';
import TableHeader from '../components/elements/TableHeader';
import Header from '../components/Header';
import Layout from '../components/Layout';

const Dashboard = () => {
    return (
        <Layout>
            <Header />
            <TableHeader/>
            <DataTable/>
        </Layout>
    )
}

export default Dashboard