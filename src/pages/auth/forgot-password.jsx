import { useState } from "react";
import { Route, ArrowRight, ArrowLeft, Loader2, MailCheck } from "lucide-react";
import { useNavigate, Link } from "react-router";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!email.trim()) {
      setError("Required");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors"
        >
          <Route className="h-5 w-5 text-green-600" />
          <span className="font-bold text-sm">Matatu Finder</span>
        </button>
      </div>

      <div className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {!sent ? (
              <>
                <div className="mb-8">
                  <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
                    Forgot password?
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Enter your email and we'll send you a reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                    </div>

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      className={`w-full px-3 py-2.5 border rounded-lg text-sm outline-none transition-colors focus:ring-2 focus:ring-green-600 focus:border-green-600 ${
                        error ? "border-red-400 bg-red-50" : "border-gray-300"
                      }`}
                    />
                    {error && (
                      <p className="text-xs text-red-500 mt-1">{error}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        Send reset link <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  <Link
                    to="/sign-in"
                    className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
                  </Link>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center text-center gap-5 py-4">
                <div className="w-14 h-14 bg-green-600 rounded-md flex items-center justify-center">
                  <MailCheck className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-xl font-bold text-gray-900">
                    Check your inbox
                  </p>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto">
                    We sent a reset link to{" "}
                    <span className="font-semibold text-gray-700">{email}</span>
                    . It expires in 15 minutes.
                  </p>
                </div>
                <div className="flex flex-col gap-2 w-full">
                  <button
                    onClick={() => setSent(false)}
                    className="w-full py-2.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Try a different email
                  </button>
                  <Link
                    to="/sign-in"
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 text-white rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors"
                  >
                    Back to sign in
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
