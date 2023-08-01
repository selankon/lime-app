import { Fragment } from "preact";
import { useState } from "preact/hooks";

import AlertIcon from "plugins/lime-plugin-alerts/src/alertIcon";

import { useBoardData } from "utils/queries";

import { useAppContext } from "../../utils/app.context";
import style from "./style.less";

export const Header = ({ Menu }) => {
    const { data: boardData } = useBoardData();
    const { menuEnabled } = useAppContext();
    const [menuOpened, setMenuOpened] = useState(false);

    function toggleMenu() {
        setMenuOpened((prevValue) => !prevValue);
    }

    return (
        <Fragment>
            <header className={style.header}>
                {boardData && <h1>{boardData.hostname}</h1>}
                {boardData && menuEnabled && (
                    <div className="flex items-center ">
                        <AlertIcon />
                        <div
                            className={`${style.hamburger} ${
                                menuOpened ? style.isActive : ""
                            }`}
                            onClick={toggleMenu}
                        >
                            <span>toogle menu</span>
                        </div>
                    </div>
                )}
            </header>
            <Menu opened={menuOpened} toggle={toggleMenu} />
        </Fragment>
    );
};
