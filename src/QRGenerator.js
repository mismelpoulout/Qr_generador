// QRGenerator.js
import React, { useState, useRef } from 'react';
import QRCode from 'qrcode.react';
import { Modal, Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';

const QRGenerator = () => {
  const [text, setText] = useState('');
  const [logo, setLogo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const qrContainerRef = useRef(null);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(URL.createObjectURL(file));
  };

  const handleCloseModal = () => setShowModal(false);

  const handleDownloadQR = async () => {
    if (qrContainerRef.current) {
      try {
        const canvas = await html2canvas(qrContainerRef.current);
        const url = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = url;
        link.download = 'codigo-qr.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error al descargar el código QR:', error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="form-group">
            <br />
            <input
              type="text"
              id="qrText"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder='Ingresa tu texto aqui'
            />
          </div>
          <br />
          <div className="form-group">
            <label htmlFor="logo">Personalizar con un logo:</label>
            <br />
            <br />
            <input
              type="file"
              id="logo"
              accept=".png, .svg , .jpg, .jpeg"
              onChange={handleLogoChange}
            />
          </div>
          <div className="text-center" ref={qrContainerRef}>
            {text && (
              <>
                <QRCode
                  value={text}
                  renderAs={'svg'}
                  level="H"
                  size={256}
                  includeMargin={true}
                  imageSettings={{ src: logo, x: null, y: null, height: 50, width: 50, excavate: true }}
                />
                <br/><br/><br/>
                <Button variant="primary" onClick={() => setShowModal(true)}>
                  Descargar QR
                </Button>
              </>
            )}
          </div>

          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Felicidades ya tienes tu codigo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Button variant="success" onClick={handleDownloadQR}>
                Descargar Qr
              </Button>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cerrar
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default QRGenerator;
