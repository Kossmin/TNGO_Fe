using TnG_BE.Models;

namespace TodoApi.IRepository
{
    public interface IWalletRepository
    {
        IEnumerable<Wallet> GetWallets();
        Wallet GetWallet(int id);
        int InsertWallet(Wallet wallet);
        bool UpdateWallet(Wallet wallet);
        bool DeleteWallet(int id);
    }
}
