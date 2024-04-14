import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Open opens="cabin-form">
                    <Button>Add new cabin</Button>
                </Modal.Open>
                <Modal.Window name="cabin-form">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

// function AddCabin() {
//     const [isOpenModel, setOpenModel] = useState(false);
//     return (
//         <>
//             <Button onClick={() => setOpenModel((show) => !show)}>Add new cabin</Button>
//             {isOpenModel && <Modal onClose={() => setOpenModel(false)}><CreateCabinForm onClose={() => setOpenModel(false)} /></Modal>}
//         </>
//     )
// }

export default AddCabin;
