import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon";
import useLogout from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

function Logout() {
    const { logout, isLoading } = useLogout();
    return (
        <Modal>
            <Modal.Open opens="logout">
                <ButtonIcon disabled={isLoading}>
                    {!isLoading ? <HiArrowRightOnRectangle /> : <SpinnerMini />}

                </ButtonIcon>
            </Modal.Open>
            <Modal.Window name="logout">
                <ConfirmDelete resourceName="logout" disabled={isLoading} onConfirm={logout} />
            </Modal.Window>
        </Modal>
    );
}

export default Logout;
