import { BsChevronLeft, BsXCircle } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './compras.css';

function CompraFallo() {
  const location = useLocation();
  const navigate = useNavigate();
  const compraId = location.state?.compraId;
  const errorMsg = location.state?.errorMsg;

  return (
    <main className="container my-4">
      <div className="wireframe-box p-4 mb-5">
        <Button as={Link} to="/home" variant="outline-primary">
          <BsChevronLeft className='me-1'/>Volver al Inicio
        </Button>

        <div className="p-3 bg-white text-center">
          <h1 className="mt-4 text-danger">
            <BsXCircle className="me-2" color="#dc3545" />
            No se pudo realizar el pago {compraId ? `nro #${compraId}` : ''}
          </h1>

          <Card className="mt-4 mb-4 text-center">
            <Card.Body>
              <Card.Title className="text-secondary">Ocurrió un problema con la transacción</Card.Title>
              <Card.Text>
                {errorMsg || "Su pago no pudo ser procesado. Por favor, verifique sus datos de pago e intente nuevamente."}
              </Card.Text>
            </Card.Body>
          </Card>

          <div className="my-4">
            <Button
              variant="success"
              size="lg"
              className="fw-bold px-4"
              onClick={() => navigate("/compras", { state: { reintentarCompraId: compraId } })}
            >
              Volver a Realizar el Pago
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default CompraFallo;