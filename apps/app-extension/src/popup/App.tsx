import { Footer } from "../components/footer";
import { List } from "../components/list";
import { useWishlist } from "../hooks/use-wishlist";

export default function App() {
  const { wishlist, loading, removeItem } = useWishlist();

  if (loading) {
    return (
      <div className="flex flex-col h-full min-h-[300px]">
        <header className="bg-primary text-primary-foreground p-4">
          Loading...
        </header>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-[300px]">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-xl font-bold">Wishlist</h1>
      </header>
      <main className="flex-1 overflow-y-auto p-4">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-muted-foreground">
            <p className="text-lg mb-2">Your wishlist is empty</p>
            <p className="text-sm text-center">
              Visit a supported product page and click "Add to Wishlist" to get
              started
            </p>
          </div>
        ) : (
          <>
            <List items={wishlist} onRemove={removeItem} />
            <Footer items={wishlist} />
          </>
        )}
      </main>
    </div>
  );
}
