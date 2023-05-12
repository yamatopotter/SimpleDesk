import { UsersFour } from "@phosphor-icons/react"
import { CommonButton } from "../../components/CommonButton/CommonButton"
import { CommonInput } from "../../components/CommonInput/CommonInput"

export const AddSector = () => {
    return (
        <div className="flex flex-col gap-5">
            <h1 className="text-xl">Adicionar Setor</h1>

            <form className="flex flex-col gap-5">
                <div className="flex flex-col gap-5">
                    <label htmlFor="sectorName">Nome</label>
                    <CommonInput id="sectorName" name="sectorName" />
                </div>

                <CommonButton icon={<UsersFour size={24} />} content="Salvar setor" />
            </form>
        </div>
    )
}