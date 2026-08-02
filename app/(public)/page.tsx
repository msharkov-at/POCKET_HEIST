// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Assign your coworkers sneaky little missions, rack up points for
          every heist you pull off, and see who really runs the office. No
          budget, no permission, just pure petty chaos.
        </p>
      </div>
    </div>
  )
}
