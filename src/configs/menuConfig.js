import { HomeOutlined, FileOutlined, FolderOutlined, OrderedListOutlined } from '@ant-design/icons';
const menuList = [
    {
        title: 'Home',
        icon: <HomeOutlined />,
        key: '/home'
    },
    {
        title: 'Your libray',
        icon: <FileOutlined />,
        key: '/library',
        children: [
            {
                title: 'Folder',
                icon: <FolderOutlined />,
                key: '/folders',
            },
            {
                title: 'Study sets',
                icon: <OrderedListOutlined />,
                key: '/study-sets',
            }
        ]
    },
    {
        title: 'Test',
        icon: <HomeOutlined />,
        key: '/test'
    },
]

export default menuList;