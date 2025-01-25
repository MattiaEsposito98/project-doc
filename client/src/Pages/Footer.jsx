import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.text}>
          &copy; {new Date().getFullYear()} La Mia Azienda. Tutti i diritti riservati.
        </p>
        <p style={styles.text}>
          <a style={styles.link}>Privacy Policy</a> |
          <a style={styles.link}>Terms of Service</a>
        </p>
        <div style={styles.socialLinks}>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <FontAwesomeIcon icon={faFacebook} style={styles.icon} />
            <span style={styles.socialText}>Facebook</span>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <FontAwesomeIcon icon={faTwitter} style={styles.icon} />
            <span style={styles.socialText}>Twitter</span>
          </a>
          <a className='link' href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialLink}>
            <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
            <span style={styles.socialText}>Instagram</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2a5045',
    color: '#fff',
    padding: '20px 0',
    textAlign: 'center',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  text: {
    margin: '5px 0',
  },
  link: {
    color: '#f0f0f0',
    textDecoration: 'none',
    margin: '0 10px',
  },
  socialLinks: {
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialLink: {
    margin: '0 10px',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#fff',
  },
  icon: {
    width: '24px',
    height: '24px',
    marginRight: '8px',
  },
  socialText: {
    marginLeft: '8px',
  },
};

export default Footer;
