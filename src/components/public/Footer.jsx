import React from 'react'
import { GrTwitter } from 'react-icons/gr'
import { FiInstagram } from 'react-icons/fi'
import { AiFillFacebook } from 'react-icons/ai'
import { CgWebsite } from 'react-icons/cg'


function Footer() {
  return (
    <>
      <div className='container-fluid footer'>
        <div className="container  ">
          <footer className="py-5">
            <div className="row">
              <div className="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Home</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Features</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Pricing</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">FAQs</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">About</a></li>
                </ul>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Home</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Features</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Pricing</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">FAQs</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">About</a></li>
                </ul>
              </div>
              <div className="col-6 col-md-2 mb-3">
                <h5>Section</h5>
                <ul className="nav flex-column">
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Home</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Features</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">Pricing</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">FAQs</a></li>
                  <li className="nav-item mb-2"><a href={"/#"} className="nav-link p-0 text-muted">About</a></li>
                </ul>
              </div>
              <div className="col-md-5 offset-md-1 mb-3">
                <form>
                  <h5>Subscribe to our newsletter</h5>
                  <p>Monthly digest of what's new and exciting from us.</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                    <input id="newsletter1" type="text" className="form-control" placeholder="Email address" />
                    <button className="btn btn-primary" type="button">Subscribe</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top ">
              <p>&copy; 2022 All right Reversed. Fintech Credit Systems India Pvt Ltd</p>
              <ul className="list-unstyled d-flex">
                <li className="ms-3"><a className="link-dark" href={"https://twitter.com/credit_india"} onClick={e => e.preventDefault()}><svg className="bi" width="24" height="24"></svg><GrTwitter /></a></li>
                <li className="ms-3"><a className="link-dark" href={"https://www.instagram.com/creditsystemsindia/"} onClick={e => e.preventDefault()}><svg className="bi" width="24" height="24"></svg><FiInstagram /></a></li>
                <li className="ms-3"><a className="link-dark" href={"https://www.facebook.com/creditsystemsindia/"} onClick={e => e.preventDefault()}><svg className="bi" width="24" height="24"></svg><AiFillFacebook /></a></li>
                <li className="ms-3"><a className="link-dark" href={"http://creditsystemsindia.com"} onClick={e => e.preventDefault()}><svg className="bi" width="24" height="24"></svg><CgWebsite /></a></li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}

export default Footer