import { tavernInfo } from '../data/tavernInfo'

function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto max-w-6xl text-sm text-[#d8cfc2]">
        © {tavernInfo.name}
      </div>
    </footer>
  )
}

export default Footer