import React from 'react'
import { Logo } from '../../Components/Logo'
import Cards from '../../Components/Cards'
import data from './data.json'
import Hero from '../../Components/Hero'
import Buttons, { BUTTONS_TYPES } from '../../Components/Buttons'

function Home() {
  return (
    <>
      <section className="container my-5">
        <Hero />
      </section>
      <section className="container my-5 text-start">
        <div className="row align-items-center">
          <div className="col-12 col-md-5 mb-4">
            <h2 className="fw-light mb-4 text-primary-emphasis">
              Simplifiez la gestion de vos aliments
            </h2>
            <p>
              Avez-vous déjà oublié un aliment dans votre placard jusqu&apos;à ce qu&apos;il soit
              trop tard ? Ou peut-être vous êtes-vous retrouvé à jeter des produits périmés, faute
              de les avoir consommés à temps ? Avec <Logo />, ces soucis appartiennent désormais au
              passé.
            </p>
            <Buttons type={BUTTONS_TYPES.LINK} address={'/login'} label="Se connecter" />
          </div>
          <div className="col-12 col-md-6 offset-md-1">
            <img
              src="https://picsum.photos/600/300?random=1"
              alt=""
              className="w-100 rounded shadow"
            />
          </div>
        </div>
      </section>
      <section className="container my-5 text-start">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-6">
            <img
              src="https://picsum.photos/600/300?random=2"
              alt=""
              className="w-100 rounded shadow"
            />
          </div>
          <div className="col-12 col-md-5 mt-4 offset-md-1">
            <h2 className="fw-light mb-4 text-primary-emphasis">
              Ne perdez plus jamais de vue vos aliments
            </h2>
            <p>
              <Logo /> est bien plus qu&apos;une simple application de gestion des aliments.
              C&apos;est votre compagnon intelligent qui vous aide à garder une trace de tout ce qui
              se trouve dans vos placards, votre réfrigérateur et votre congélateur. Fini les oublis
              et les pertes inutiles !
            </p>
            <Buttons type={BUTTONS_TYPES.LINK} address={'/signup'} label="S'inscrire" />
          </div>
        </div>
      </section>
      <section className="container">
        <div className="row gy-4 gy-md-0 mt-4">
          {data.cards.map((item, index) => {
            return <Cards items={item} key={index} type={'presentation'} />
          })}
        </div>
      </section>
      <section className="container my-5 text-start">
        <div className="row justify-content-center align-items-center">
          <div className="col-12 col-md-5">
            <h2 className="mb-4 text-primary-emphasis lh-base">
              Rejoignez la communauté <Logo /> dès aujourd&apos;hui
            </h2>
            <p>
              Soyez parmi les premiers à profiter de cette révolution dans la gestion des aliments.
              Inscrivez-vous dès maintenant à <Logo /> et découvrez comment simplifier votre
              quotidien en cuisine. Rejoignez notre communauté et ensemble, rendons la gestion des
              aliments plus facile, plus efficace et plus agréable que jamais !
            </p>
            <Buttons type={BUTTONS_TYPES.LINK} address={'/signup'} label="S'inscrire" />
          </div>
          <div className="col-12 col-md-6 offset-md-1 mt-5">
            <img
              src="https://picsum.photos/600/300?random=3"
              alt=""
              className="w-100 rounded shadow"
            />
          </div>
        </div>
      </section>
    </>
  )
}

export default Home
