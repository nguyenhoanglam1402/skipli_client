import NavigationBar from "../components/common/navigationBar";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ThumbUpAltRounded } from "@mui/icons-material";
import { getGitHubUsers, likeGitHubUser } from "../services/github.services";

const HomePage = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(25);
  const [refresh, setRefresh] = useState(0);
  const [totalRow, setTotal] = useState(0);
  const [isLoading, setLoading] = useState(false);

  const fetchGitHubUser = async (gitHubUsername: string, page: number = 1, perPage: number = 5) => {
    setLoading(true);
    const response = await getGitHubUsers(gitHubUsername, page, perPage);
    console.log(response);
    const data = [...response.data.result.data];
    setTotal(response.data.result.totalRow);
    setLoading(false);
    setTableData([...data]);
  };

  const onChangePerPage = (pageSize: number) => {
    localStorage.setItem("perPage", pageSize.toString());
    setPerPage(pageSize);
  };

  useEffect(() => {
    onChangePerPage(25);
  }, []);

  useEffect(() => {
    const perPage = Number.parseInt(localStorage.getItem("perPage") || "0");
    const username = localStorage.getItem("username") || "";
    fetchGitHubUser(username, page, perPage).catch(error => alert("Error to fetch"));
  }, [refresh]);


  const likeUserProfileHandler = (id: number) => {
    const data = [...tableData];
    const userData = data.find((user) => user.id === id);
    userData.like = true;
    likeGitHubUser(userData.id)
      .catch((error) => alert("Cannot like this person"));
    setTableData([...data]);
  };


  const columns: GridColDef[] = [
    {
      headerAlign: "center",
      headerName: "ID ",
      field: "id",
      width: 90,
    },
    {
      headerAlign: "center",
      headerName: "Avatar",
      sortable: false,
      field: "avatar_url",
      width: 90,
      renderCell: (params: GridRenderCellParams) => (
        <img className="w-9" src={params.value} alt="" />
      ),
    },
    {
      headerAlign: "center",
      headerName: "Public Repos ",
      field: "public_repos",
      width: 150,
    },
    {
      headerAlign: "center",
      headerName: "HTML URL",
      field: "html_url",
      width: 300,
    },
    {
      headerAlign: "center",
      headerName: "Followers",
      field: "followers",
      width: 200,
    },
    {
      headerAlign: "center",
      headerName: "Actions",
      width: 200,
      field: "action",
      renderCell: (params: GridRenderCellParams) => (
        <div>
          <ThumbUpAltRounded
            color={params.row.like && params.row.like === true ? "primary" : "disabled"}
            onClick={() => likeUserProfileHandler(params.row.id)} />
        </div>
      ),
    },
  ];

  return <div>
    <NavigationBar onFetchUser={fetchGitHubUser} />
    <div className="w-full" style={{ height: "calc(100vh - 56px)" }}>
      <DataGrid loading={isLoading}
                paginationMode="server"
                columns={columns}
                rows={tableData}
                rowCount={totalRow}
                pagination={true}
                page={page}
                pageSize={perPage}
                onPageSizeChange={pageSize => {
                  onChangePerPage(pageSize);
                  setRefresh(prevState => prevState + 1);
                }}
                onPageChange={(page) => {
                  setPage(page);
                  setRefresh(prevState => prevState + 1);
                }} />
    </div>

  </div>;
};

export default HomePage;