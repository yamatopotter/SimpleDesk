import { toast } from "react-toastify";
import { LoadingComponent } from "../../components/LoadingComponent/LoadingComponent";

export const UpdateUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getUser(id);

        if (data == null) {
          toast.error(
            "Houve um erro no carregamento dos dados, tente novamente.",
            {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          setIsLoading(false);
          navigate("/user");
        }

        setUser(user);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
        toast.error(
          "Houve um erro no carregamento dos dados, tente novamente.",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );
        setIsLoading(false);
        navigate("/status");
      }
    }

    getData();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
      <Container></Container>
    </LoadingComponent>
  );
};
