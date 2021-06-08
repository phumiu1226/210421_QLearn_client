import React from 'react'
import menuList from '../../../configs/menuConfig';
import { NavLink } from 'react-router-dom';
import './index.less';
import Loading from '../../UI/Loading';


const createMenu = (menuList) => {
    return menuList.map(menu => {
        if (!menu.children) {
            return (
                <NavLink to={menu.key} key={menu.key} activeClassName="active-navlink" className='navbar-navlink'>
                    <span className='icon'>{menu.icon}</span>
                    {menu.title}
                </NavLink>
            )
        } else {
            return (
                <div className="subnav" key={menu.key}>
                    <button className='subnav-button'>
                        <span className='icon'>{menu.icon}</span>
                        {menu.title}
                    </button>
                    <div className='subnav-content'>
                        {createMenu(menu.children)}
                    </div>
                </div>
            )
        }
    });
}



class MainMenu extends React.Component {


    initMenu = () => {
        const menu = createMenu(menuList);
        this.setState({ menu });
    }

    componentDidMount() {
        this.initMenu();
    }

    render() {

        if (!this.state) return <Loading />
        return (
            <div className='navbar'>
                {this.state.menu}
                {/* <a href="/home">
                    <span className='icon'><HomeOutlined /></span>
                    Home
                </a>
                <div className="subnav" >
                    <button className='subnav-button'>
                        <span className='icon'><FileOutlined /></span>
                        Your libray
                    </button>
                    <div className='subnav-content'>
                        <a href='/home'>
                            <span className='icon'><FolderOutlined /></span>
                            Folder
                        </a>
                        <a href='/home'>
                            <span className='icon'><OrderedListOutlined /></span>
                            Study sets
                        </a>
                    </div>
                </div> */}
            </div>
        );
    }
}


export default MainMenu;