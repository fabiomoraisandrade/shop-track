import { Table, TableBody, TableCell, TableHead, TableRow, Button } from "@mui/material";
import { PaperDiv, TableContainer } from "./styles";
import { useManageUsers } from "../../hooks";

const AdmTable = () => {
    const { deleteUserById, users, tableHeader } = useManageUsers();

    return (
        <TableContainer>
            <PaperDiv>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {
                                tableHeader.map((e) => <TableCell key={ e }>{ e }</TableCell>)
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { users.length > 0
                            ? users.map((user, index) => {
                            const { name, email, isAdmin, id } = user;

                            return (
                                <TableRow>
                                    <TableCell
                                        data-testid={`admin_manage__element-user-table-item-number-${index}`}
                                    >
                                        { index + 1 }
                                    </TableCell>
                                    <TableCell
                                        data-testid={`admin_manage__element-user-table-name-${index}`}
                                    >
                                        { name }
                                    </TableCell>
                                    <TableCell
                                        data-testid={`admin_manage__element-user-table-email-${index}`}
                                    >
                                        { email }
                                    </TableCell>
                                    <TableCell
                                        data-testid={`admin_manage__element-user-table-role-${index}`}
                                    >
                                        { isAdmin ? "Administrador" : "Comum" }
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            data-testid={ `admin_manage__element-user-table-remove-${index}` }
                                            onClick={ () => deleteUserById(id) }
                                        >
                                            Excluir
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            );
                        }) : null }
                    </TableBody>
                </Table>
            </PaperDiv>
        </TableContainer>
    );
};

export default AdmTable;