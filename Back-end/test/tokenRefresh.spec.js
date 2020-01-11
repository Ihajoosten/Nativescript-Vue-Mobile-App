const jwt = require('jsonwebtoken');
const chai = require('chai');
const expect = chai.expect;
const authController = require('../src/controllers/auth.controller');

describe('Refresh token', function() {
    let activeToken;

    let extendableToken;

    let expiredToken;
    let expiredIat

    beforeEach(async function() {
        const payload = { 
            username: 'user', 
            userid: 1
        };

        activeToken = jwt.sign(payload, "secret", { expiresIn: "3d" });

        payload.iat = Math.floor(new Date().getTime() / 1000) - (60 * 60 * 24 * 3) - 60 * 60;
        extendableToken = jwt.sign(payload, "secret", { expiresIn: "3d" })

        payload.iat = Math.floor(new Date().getTime() / 1000) - (60 * 60 * 24 * 4) - 60 * 60;
        expiredIat = payload.iat
        expiredToken = jwt.sign(payload, "secret", { expiresIn: "3d" })
    })

    it('should return the same token when token is still active', function() {
        const token = authController.funcRefreshToken(activeToken);

        expect(token === activeToken);
    })

    it('should return a new token when token is extendable', function() {
        const token = authController.funcRefreshToken(extendableToken);
        const decoded = jwt.decode(token, "secret");

        expect(decoded).to.exist;
        expect(token).to.not.equal(extendableToken);

        // Token time should now be 14 days
        expect(decoded.exp - decoded.iat).to.equal(60 * 60 * 24 * 14)
    })

    it('should return the same token if token cannot be extended', function() {
        const token = authController.funcRefreshToken(expiredToken);
        const decoded = jwt.decode(token, "secret");

        expect(decoded).to.exist;
        expect(token).to.equal(expiredToken);

        // Token time should still be 3 days
        expect(decoded.exp - decoded.iat).to.equal(60 * 60 * 24 * 3);
        expect(decoded.iat).to.equal(expiredIat);
    })

})