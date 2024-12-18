import { cloneElement } from 'react'
import Avatar from '@/components/ui/Avatar'
import Logo from '@/components/template/Logo'
import { APP_NAME } from '@/constants/app.constant'
import type { CommonProps } from '@/@types/common'
import {appConfig} from "../../../configs/app.config"
import { Link } from 'react-router-dom'

interface SideProps extends CommonProps {
    content?: React.ReactNode
}

const Side = ({ children, content, ...rest }: SideProps) => {
    return (
      <div className="grid lg:grid-cols-3 h-full">
        <div
          className="bg-no-repeat bg-cover py-6 px-16 flex-col justify-between hidden lg:flex"
          style={{
            backgroundImage: `url('/img/others/auth-side-bg.jpg')`,
          }}
        >
          <Logo mode="dark" />
          <div>
            <div className="mb-6 flex items-center gap-4">
              <div className="text-white">
                <div className="font-semibold text-base">Knights of Columbus</div>
                <span className="opacity-80">9544 Council</span>
              </div>
            </div>
            <p className="text-lg text-white opacity-80">Welcome to the Members Only portion of the Knights of Columbus 9544 Council.</p>
            <p className="text-lg text-white">
              <span className="font-semibold">
                  <Link to={appConfig.webPrefix}>Knights of Columbus Website</Link>
              </span>
            </p>
          </div>
          <span className="text-white">
            Copyright &copy; {`${new Date().getFullYear()}`} <span className="font-semibold">{`${APP_NAME}`}</span>{" "}
          </span>
        </div>
        <div className="col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800">
          <div className="xl:min-w-[450px] px-8">
            <div className="mb-8">{content}</div>
            {children
              ? cloneElement(children as React.ReactElement, {
                  ...rest,
                })
              : null}
          </div>
        </div>
      </div>
    );
}

export default Side
