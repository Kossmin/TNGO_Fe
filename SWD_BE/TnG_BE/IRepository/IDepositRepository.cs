using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IDepositRepository
    {
        IEnumerable<Deposit> GetDeposits();
        Deposit GetDeposit(int id);
        int InsertDepsoit(Deposit deposit);
        bool UpdateDeposit(Deposit deposit);
        bool DeleteDeposit(int id);
    }
}
