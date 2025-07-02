import SaleHistory from '../Components/MainInfoTab/SaleHistory'

interface IProps {
  dataTransaction: any[]
}

function SaleHistorySession({ dataTransaction }: IProps) {
  return (
    <>
      <SaleHistory dataTransaction={dataTransaction} />
    </>
  )
}

export default SaleHistorySession
