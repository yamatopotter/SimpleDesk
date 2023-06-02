import { Home } from "../pages/Home";

export const Home = () => {
    const [listTickets, setListTickets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
    async function getStatusesList() {
        const data = await getTickets();
        setListTickets(data);
        setIsLoading(false);
    }

    getStatusesList();
    }, []);

    return (
    <LoadingComponent isLoading={isLoading}>
        <Home ticketsData={listTickets} />
    </LoadingComponent>
    );
}