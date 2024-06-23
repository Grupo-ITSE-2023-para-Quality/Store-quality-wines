import React from 'react';

const IframeMap: React.FC = () => {
  const containerStyle: React.CSSProperties = {
    padding: '20px',
    paddingBottom: '50px',
    textAlign: 'center' as 'center',
  };

  const headerStyle: React.CSSProperties = {
    marginBottom: '40px',
    fontSize: '36px',
    fontWeight: 'bold',
  };

  const contentStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
  };

  const mapContainerStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'right' as 'right',
  };

  const addressStyle: React.CSSProperties = {
    flex: 1,
    textAlign: 'left' as 'left',
    fontSize: '24px',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Dónde encontrarnos</h2>
      <div style={contentStyle}>
        <div style={addressStyle}>
          Independencia 6100<br />
          Esq. Virgen de Guadalupe<br />
          Local 6<br />
          Santiago del Estero, Argentina
        </div>
        <div style={mapContainerStyle}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3527.916584577277!2d-64.2325450236509!3d-27.843101132720776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x943b4f28c726c2a3%3A0x3e28d5d7a1dfeabb!2sQUALITY%20wines%20%26%20delicatessen!5e0!3m2!1sen!2sar!4v1719083435393!5m2!1sen!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default IframeMap;