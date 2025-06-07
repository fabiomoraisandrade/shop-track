import PropTypes from 'prop-types';
import { Form,
  Label,
} from './styles';

const CheckoutAddressForm = ({ bodyInfo, handleChange }) => (
    <Form>
        <Label htmlFor="address-field">
            Endereço
            <input 
                name="deliveryAddress"
                data-testid="customer_checkout__input-address"
                type="text"
                id="address-field"
                placeholder="Av. Contorno"
                onChange={ ({ target }) => handleChange(target) }
                value={ bodyInfo.deliveryAddress }
            />
        </Label>
        <Label htmlFor="number-field">
            Número
            <input 
                name="deliveryNumber"
                data-testid="customer_checkout__input-addressNumber"
                type="number"
                id="number-field"
                placeholder="123"
                onChange={ ({ target }) => handleChange(target) }
                value={ bodyInfo.deliveryNumber }
            />
        </Label>
    </Form>
);

CheckoutAddressForm.propTypes = {
  bodyInfo: PropTypes.shape({
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }),
  handleChange: PropTypes.func.isRequired,
};

CheckoutAddressForm.defaultProps = {
  bodyInfo: PropTypes.shape({
    deliveryAddress: '',
    deliveryNumber: '',
  }),
};

export default CheckoutAddressForm;